import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View,Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'
import {Bars3CenterLeftIcon,MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import TrendingMovies from "../components/trendingMovies/trendingMovies";
import MovieList from "../components/trendingMovies/MovieList";
import Loading from "../components/Loading";
const ios = Platform.OS == 'ios'
export default function HomeScreen(){

    const [trending,setTrending] = useState([1,1,1,1,1,1])
    const [upcoming,setUpcoming] = useState([1,1,1,1,1,1])
    const [topRated,setTopRated] = useState([1,1,1,1,1,1])

    const [loading,setLoading] = useState(false)
    return(
        <View style={tw`flex-1 bg-neutral-800`}>
            <SafeAreaView style={tw`${ios? "-mb-2":"mb-3"}`}>
                <StatusBar style="light"/>
                <View style={tw`flex-row justify-between items-center mx-4`}>
                    <Bars3CenterLeftIcon size="30" color="white" strokeWidth={2}></Bars3CenterLeftIcon>
                    <Text style={tw`text-white text-3xl font-bold`}><Text style={tw`text-yellow-500 text-3xl font-bold`}>M</Text>ovies</Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon  size="30" color="white" strokeWidth={2}></MagnifyingGlassIcon>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {loading?(<Loading></Loading>):
            (<ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle ={{paddingBottom:10}}
            >
                <TrendingMovies data= {trending}></TrendingMovies>
                <MovieList data={upcoming} title={'Upcoming'} hideShowAll={false}></MovieList>
                <MovieList data={topRated} title={'Top Rated'} hideShowAll={false}></MovieList>
            </ScrollView>)
            }
            
        </View>
    );

}