import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/trendingMovies/MovieList';
var {width,height} = Dimensions.get('window')
import Loading from '../components/Loading';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/MovieAPI';
import { convertDate } from '../components/Helper';
export default function MovieScreen() {

    const {params:item} = useRoute();
    const navigation = useNavigation();
    const [cast, setCast] = useState()
    const [similar, setSimilar] = useState([])
    const [loading,setLoading] = useState(false)
    const [movieDetail,setMovieDetails] = useState({})
    
    useEffect(()=>{
        setLoading(true)
        getMovieDetails(item.id)
        getSimilarMovie(item.id)
        getMovieCast(item.id)
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
    
  return (
    <ScrollView
        contentContainerStyle={{paddingBottom:20}}
        style = {tw`flex-1 bg-neutral-900`}
    >
      <View  style = {tw`w-full`}>
            <SafeAreaView style ={tw`absolute z-20 flex-row justify-between items-center w-full px-4 `}>
                <TouchableOpacity style={tw`rounded-xl p-1`}>
                    <ChevronLeftIcon onPress={()=> navigation.goBack()} size={30} strokeWidth={2.5} color='white'></ChevronLeftIcon>
                </TouchableOpacity>
                
            </SafeAreaView>

            {loading?(<Loading></Loading>):(
                <View>
                    <View>
                        <Image
                            source = {{uri:image500(movieDetail.poster_path)}}
                            style={tw`w-full h-[${height*0.14}]`}
                        ></Image>
                        <LinearGradient 
                            colors ={['transparent','rgba(23,23,23,0.8)','rgba(23,23,23,1)']}
                            start={{x:0.5, y:0}}
                            end= {{x:0.5,y:1}}
                            style={tw`w-full h-[${height*0.07}] absolute bottom-0`}
                        />

                    
                    </View>
                    <View style={{marginTop: -(height*0.09)}}>
                            <Text style={tw`text-white justify-between text-center text-3xl font-bold tracking-wider mx-3`}>{movieDetail.title}</Text>
                            <Text style={tw`text-neutral-400 font-semibold text-base text-center mx-3 mt-1`}>{movieDetail.status} • {convertDate(movieDetail.release_date)} • {movieDetail.runtime} min</Text>
                            <Text style={tw`text-neutral-400 font-semibold text-base text-center mx-3 mt-1`}>{movieDetail?.genres?.map(genre => genre.name).join(' • ')}</Text>
                            <Text style={tw`text-neutral-400 font-semibold text-base text-center mx-3 mt-1`}>&#9733; {movieDetail.vote_average?.toFixed(1)}</Text>
                    </View>
                    <Text style={tw`text-white font-semibold text-xl mx-3 mt-3`}>Synopsis</Text>
                    <Text style={tw`text-neutral-400 font-semibold text-base mx-3 mt-1`}>
                        {movieDetail.overview}
                    </Text>
                

                    <Cast cast = {cast?.slice(0,10)} navigation = {navigation}></Cast>
                    <MovieList data={similar} title={'Similar Movies'} hideShowAll={true}></MovieList>
                            </View>
                            
            )}
            
            
        </View>
        
    </ScrollView>
  )
}