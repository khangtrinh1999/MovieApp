import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View,Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc'
import {Bars3CenterLeftIcon,MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import TrendingMovies from "../components/trendingMovies/trendingMovies";
const ios = Platform.OS == 'ios'
export default function HomeScreen(){

    const [trending,setTrending] = useState([1,1,1,1,1,1])
    return(
        <View style={tw`flex-1 bg-neutral-800`}>
            <SafeAreaView style={tw`${ios? "-mb-2":"mb-3"}`}>
                <StatusBar style="light"/>
                <View style={tw`flex-row justify-between items-center mx-4`}>
                    <Bars3CenterLeftIcon size="30" color="white" strokeWidth={2}></Bars3CenterLeftIcon>
                    <Text style={tw`text-white text-3xl font-bold`}>Movies</Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon  size="30" color="white" strokeWidth={2}></MagnifyingGlassIcon>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle ={{paddingBottom:10}}
            >
                <TrendingMovies data= {trending}></TrendingMovies>
            </ScrollView>
        </View>
    );

}