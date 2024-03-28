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
export default function MovieScreen() {
    const movieName = 'Oppenheimer'
    const {params:item} = useRoute();
    const navigation = useNavigation();
    useEffect(()=>{

    },[item])

    const [cast, setCast] = useState([1,1,1,1,1])
    const [similar, setSimilar] = useState([1,1,1,1,1])
    const [loading,setLoading] = useState(false)
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
                            source = {require('/Users/khangtrinh/react_native_project/MovieApp/assets/opp.jpg')}
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
                            <Text style={tw`text-white justify-between text-center text-3xl font-bold tracking-wider mx-3`}>{movieName}</Text>
                            <Text style={tw`text-neutral-400 font-semibold text-base text-center mx-3 mt-1`}>Released • 2023 • 150 min</Text>
                            <Text style={tw`text-neutral-400 font-semibold text-base text-center mx-3 mt-1`}>Action • Thrill • Historical</Text>
                    </View>
                    <Text style={tw`text-white font-semibold text-xl mx-3 mt-3`}>Synopsis</Text>
                    <Text style={tw`text-neutral-400 font-semibold text-base mx-3 mt-1`}>
                    During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.
                    </Text>
                

                    <Cast cast = {cast} navigation = {navigation}></Cast>
                    <MovieList data={similar} title={'Similar Movies'} hideShowAll={true}></MovieList>
                            </View>
                            
            )}
            
            
        </View>
        
    </ScrollView>
  )
}