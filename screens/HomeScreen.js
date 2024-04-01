import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View,Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'
import {Bars3CenterLeftIcon,MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import TrendingMovies from "../components/trendingMovies/trendingMovies";
import MovieList from "../components/trendingMovies/MovieList";
import Loading from "../components/Loading";
import { fetchTopRateShows, fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/MovieAPI";
import { useNavigation } from "@react-navigation/native";
import { topRateMovies, topRatedShows, upcomingMovies } from "../constant";
const ios = Platform.OS == 'ios'
export default function HomeScreen(){
    const navigation = useNavigation()
    const [trending,setTrending] = useState([])
    const [upcoming,setUpcoming] = useState([])
    const [topRated,setTopRated] = useState([])
    const [topRatedShow,setTopRatedShow] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        getTrendingMovie();
        getUpcomingMovie();
        getTopRatedMovie();
        getTopRatedShow();
    },[])

    const getTrendingMovie = async () =>{
        const data = await fetchTrendingMovies();
        if (data && data.results) setTrending(data.results)
        setLoading(false)
    }
    const getUpcomingMovie = async () =>{
        const data = await fetchUpcomingMovies();
        if (data && data.results) setUpcoming(data.results)
        setLoading(false)
    }
    const getTopRatedMovie = async () =>{
        const query = {
            language : 'en-US',
            page:  '1',
        }
        const data = await fetchTopRatedMovies(query);
        if (data && data.results) setTopRated(data.results)
        setLoading(false)
    }

    const getTopRatedShow = async () =>{
        const query = {
            language : 'en-US',
            page:  '1',
        }
        const data = await fetchTopRateShows(query);
        if (data && data.results) setTopRatedShow(data.results)
        setLoading(false)
    }
   

    return(
        <View style={tw`flex-1 bg-black`}>
            <SafeAreaView style={tw`${ios? "-mb-2":"mb-3"}`}>
                <StatusBar style="light"/>
                <View style={tw`flex-row justify-between items-center mx-4`}>
                    <TouchableOpacity>
                        <Bars3CenterLeftIcon size="30" color="white" strokeWidth={2}></Bars3CenterLeftIcon>
                    </TouchableOpacity>
                    
                    <Text style={tw`text-white text-3xl font-bold`}><Text style={tw`text-red-700 text-3xl font-bold`}>Cine</Text>Verse</Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon onPress={()=>{navigation.push('Search')}} size="30" color="white" strokeWidth={2}></MagnifyingGlassIcon>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {loading?(<Loading></Loading>):
            (<ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle ={{paddingBottom:10}}
            >
                {trending.length>0 && <TrendingMovies data= {trending}></TrendingMovies>}
                <MovieList data={upcoming} title={upcomingMovies} hideShowAll={false} type={'movie'}></MovieList>
                <MovieList data={topRated} title={topRateMovies} hideShowAll={false} type={'movie'}></MovieList>
                <MovieList data={topRatedShow} title={topRatedShows} hideShowAll={false} type={'tv'}></MovieList>
            </ScrollView>)
            }
            
        </View>
    );

}