import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc'
import {  ChevronLeftIcon, VideoCameraIcon,FilmIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/trendingMovies/MovieList';
var {width,height} = Dimensions.get('window')
import Loading from '../components/Loading';
import { fetchMovieCredits, fetchMovieDetails, fetchMovieVideo, fetchSimilarMovies, image500 } from '../api/MovieAPI';
import { convertDate } from '../components/Helper';
import YoutubePlayer from "react-native-youtube-iframe";

export default function MovieScreen() {

    const {params:item} = useRoute();
    const navigation = useNavigation();
    const [cast, setCast] = useState()
    const [similar, setSimilar] = useState([])
    const [loading,setLoading] = useState(false)
    const [movieDetail,setMovieDetails] = useState({})
    const [movieTrailer,setMovieTrailer] = useState('')
    const [playTrailer,setPlayTrailer] = useState(false)
    useEffect(()=>{
        setLoading(true)
        getMovieDetails(item.id)
        getSimilarMovie(item.id)
        getMovieCast(item.id)
        getMovieTrailer(item.id)
        console.log(item.id)
    },[item])

    const getMovieDetails = async (id) =>{
        const data = await fetchMovieDetails(id)
        if (data) setMovieDetails(data)
        setLoading(false)
    }

    const getSimilarMovie = async (id) =>{
        const data = await fetchSimilarMovies(id);
        if (data && data.results) setSimilar(data.results)
        setLoading(false)
    }

    const getMovieCast = async (id) =>{
        const data = await fetchMovieCredits(id);
        if (data && data.cast) setCast(data.cast)
        setLoading(false)
    }

    const getMovieTrailer = async (id) =>{
        const data = await fetchMovieVideo(id);
        if (data && data.results) {
            vid = data.results.find(video => (video.type == 'Trailer'));
            setMovieTrailer(vid?.key)
        }
        setLoading(false)
    }
    
  return (
    <View style={tw`flex-1 bg-black`}>
        <SafeAreaView style ={tw`absolute z-20 flex-row justify-between items-center w-1/2 px-4 `}>
            <TouchableOpacity style={tw`rounded-xl p-1`}>
                <ChevronLeftIcon onPress={()=> navigation.goBack()} size={30} strokeWidth={2.5} color='white'></ChevronLeftIcon>
            </TouchableOpacity>
    
        </SafeAreaView>
        <ScrollView
                contentContainerStyle={{paddingBottom:20}}
                style = {tw`flex-1 bg-black`}
            >
            <View  style = {tw`w-full`}>  
                
                {loading?(<Loading></Loading>):(
                    <View>
                        <View>
                            <Image
                                source = {{uri:image500(movieDetail.poster_path)}}
                                style={tw`w-full h-[${height*0.14}]`}
                            ></Image>
                            <LinearGradient 
                                colors ={['transparent','rgba(0,0,0,0.8)','rgba(0,0,0,1)']}
                                start={{x:0.5, y:0}}
                                end= {{x:0.5,y:1}}
                                style={tw`w-full h-[${height*0.07}] absolute bottom-0`}
                            />

                        
                        </View>

                        <View style={{marginTop: -(height*0.09)}}>
                                <Text style={tw`text-white justify-between text-center text-3xl font-bold tracking-wider mx-3`}>{movieDetail.title}</Text>
                                <Text style={tw`text-neutral-400 font-semibold text-base text-center mx-3 mt-1`}>{convertDate(movieDetail.release_date)} • {movieDetail.runtime} min</Text>
                                <Text style={tw`text-neutral-400 font-semibold text-base text-center mx-3 mt-1`}>{movieDetail?.genres?.map(genre => genre.name).join(' • ')}</Text>
                                <Text style={tw`text-neutral-400 font-semibold text-base text-center mx-3 mt-1`}>&#9733; {movieDetail.vote_average?.toFixed(1)}</Text>
                                <View style={tw`items-center justify-center mt-3`}>
                                    <TouchableOpacity
                                        style={tw`flex-row  w-25 h-13 bg-red-600 rounded-3xl items-center justify-center`}
                                        onPress={()=>setPlayTrailer(!playTrailer)}
                                    >   
                                        <FilmIcon size="20" color="white" strokeWidth={2} ></FilmIcon>
                                        <Text style={tw`text-white text-base font-semibold`}> Trailer </Text>
                                        
                                    </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View style={tw`${(movieTrailer && playTrailer )? '':'hidden'} mt-3`}>
                            <YoutubePlayer       
                                height={250}        
                                play={playTrailer}        
                                videoId={movieTrailer}        
                                width={'100%'}
                                initialPlayerParams = {{loop:1,rel:0}}
                                playList={[movieTrailer]}
                            />
                        </View>
                    
                        <Text style={tw`text-white font-semibold text-xl mx-3 mt-3`}>Synopsis</Text>
                        <Text style={tw`text-neutral-400 font-semibold text-base mx-3 mt-1`}>
                            {movieDetail.overview}
                        </Text>

                        <Cast cast = {cast?.slice(0,10)} navigation = {navigation}></Cast>

                        {/* {movieTrailer && (<Text style={tw`text-white font-semibold text-xl mx-3 mt-3`}>Trailer</Text>)} */}
                        
                        <MovieList data={similar} title={'Similar Movies'} hideShowAll={true}></MovieList>
                                </View>
                                
                )}
                
                
            </View>
            
        </ScrollView>
    </View>
    
  )
}