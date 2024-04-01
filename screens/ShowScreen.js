import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc'
import {  ChevronLeftIcon, VideoCameraIcon,FilmIcon, ChevronUpIcon, ChevronDownIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/trendingMovies/MovieList';
var {width,height} = Dimensions.get('window')
import Loading from '../components/Loading';
import { fetchMovieCredits, fetchMovieVideo, fetchShowCredits, fetchShowDetails, fetchShowVideo, fetchSimilarMovies, fetchSimilarShows, image500 } from '../api/MovieAPI';
import { convertDate, getPercentage } from '../components/Helper';
import YoutubePlayer from "react-native-youtube-iframe";
import * as Progress from 'react-native-progress'
export default function ShowScreen() {

    const {params:item} = useRoute();
    const navigation = useNavigation();
    const [cast, setCast] = useState()
    const [similar, setSimilar] = useState([])
    const [loading,setLoading] = useState(false)
    const [showDetail,setShowDetails] = useState({})
    const [showTrailer,setShowTrailer] = useState('')
    const [playTrailer,setPlayTrailer] = useState(false)
    useEffect(()=>{
        setLoading(true)
        getShowDetails(item.id)
        getSimilarShow(item.id)
        getShowCast(item.id)
        getShowTrailer(item.id)
        console.log(item.id)
    },[item])

    const getShowDetails = async (id) =>{
        const data = await fetchShowDetails(id)
        if (data) setShowDetails(data)
        
        setLoading(false)
    }

    

    const getSimilarShow = async (id) =>{
        const data = await fetchSimilarShows(id);
        if (data && data.results) setSimilar(data.results)
        setLoading(false)
    }

    const getShowCast = async (id) =>{
        const data = await fetchShowCredits(id);
        if (data && data.cast) setCast(data.cast)
        setLoading(false)
    }

    const getShowTrailer = async (id) =>{
        const data = await fetchShowVideo(id);
        if (data && data.results) {
            vid = data.results.find(video => (video.type == 'Trailer'));
            setShowTrailer(vid?.key)
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
                                source = {{uri:image500(showDetail.poster_path)}}
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
                                <View style={tw`justify-center items-center mb-3`}>
                                    <Progress.Circle
                                    progress={getPercentage(showDetail.vote_average)}
                                    color='rgba(220, 38, 38, 1)'
                                    unfilledColor='rgba(220, 38, 38, 0.3)'
                                    borderWidth={0}
                                    showsText={true}
                                    textStyle={tw`text-2xl font-bold`}
                                    animated={false}
                                    thickness={10}
                                    size={100}
                                    fill='rgba(0,0 ,0,0.6)'
                                    ></Progress.Circle>

                                </View>
                                <Text style={tw`text-white justify-between text-center text-3xl font-bold tracking-wider mx-3`}>{showDetail.name}</Text>
                                <Text style={tw`text-neutral-400 font-semibold text-base text-center mx-3 mt-1`}>{convertDate(showDetail.first_air_date)} • {showDetail.number_of_seasons} {(showDetail.number_of_seasons>1)?'seasons':'season'}</Text>
                                <Text style={tw`text-neutral-400 font-semibold text-base text-center mx-3 mt-1`}>{showDetail?.genres?.map(genre => genre.name).join(' • ')}</Text>
                                
                                <View style={tw`items-center justify-center mt-2`}>
                                    <TouchableOpacity
                                        style={tw`flex-row  w-25 h-13 bg-black rounded-3xl items-center justify-center`}
                                        onPress={()=>setPlayTrailer(!playTrailer)}
                                    >   
                                        <FilmIcon size="20" color='rgba(220, 38, 38, 1)' strokeWidth={2} ></FilmIcon>
                                        <Text style={tw`text-red-700 text-xl font-semibold`}> Trailer </Text>
                                        {playTrailer?(<ChevronUpIcon size="20" color='rgba(220, 38, 38, 1)' strokeWidth={2}></ChevronUpIcon>):(<ChevronDownIcon size="20" color="red" strokeWidth={2}></ChevronDownIcon>)}
                                    </TouchableOpacity>
                                </View>
                        </View>
                        
                        <View style={tw`${(showTrailer && playTrailer )? '':'hidden'} mt-3`}>
                            <YoutubePlayer       
                                height={250}        
                                play={playTrailer}        
                                videoId={showTrailer}        
                                width={'100%'}
                                initialPlayerParams = {{loop:1,rel:0}}
                                playList={[showTrailer]}
                            />
                        </View>
                    
                        <Text style={tw`text-white font-semibold text-xl mx-3 mt-3`}>Synopsis</Text>
                        <Text style={tw`text-neutral-400 font-semibold text-base mx-3 mt-1`}>
                            {showDetail.overview}
                        </Text>

                        <Cast cast = {cast} navigation = {navigation}></Cast>

                        {/* {movieTrailer && (<Text style={tw`text-white font-semibold text-xl mx-3 mt-3`}>Trailer</Text>)} */}
                        
                        <MovieList data={similar} title={'Similar Shows'} hideShowAll={true} type={'tv'}></MovieList>
                                </View>
                                
                )}
                
                
            </View>
            
        </ScrollView>
    </View>
    
  )
}