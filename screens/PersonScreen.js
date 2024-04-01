import { View, Text, Dimensions, ScrollView,TouchableOpacity,SafeAreaView,Image } from 'react-native'
import React, { useState,useEffect } from 'react'
var {width,height} = Dimensions.get('window')
import tw from 'twrnc'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation,useRoute } from '@react-navigation/native'
import MovieList from '../components/trendingMovies/MovieList'
import Loading from '../components/Loading'
import { LinearGradient } from 'expo-linear-gradient'
import { fetchPersonDetails, fetchPersonMovies, image500 } from '../api/MovieAPI'
import { convertDate } from '../components/Helper'

export default function PersonScreen() {
    navigation = useNavigation()
    const {params:person} = useRoute();
    const [personMovies, setPersonMovies] = useState([])
    const [loading,setLoading] = useState(true)
    const [detail,setDetail] = useState({})
    useEffect(()=>{
        getPersonDetail(person.id)
        getPersonMovie(person.id)
        console.log(person.id)
    },[person])

    const getPersonDetail = async (id) =>{
        const data = await fetchPersonDetails(id)
        if (data) setDetail(data)
        setLoading(false)
    }

    const getPersonMovie = async (id) =>{
        const data = await fetchPersonMovies(id)
        if (data && data.cast) setPersonMovies(data.cast)
        setLoading(false)
    }

  return (
    <ScrollView
        style ={tw`flex-1 bg-black`}
        contentContainerStyle={{paddingBottom:20}}
    >
            <SafeAreaView style ={tw`absolute z-20 flex-row justify-between items-center w-full px-4 `}>
                <TouchableOpacity style={tw`rounded-xl p-1`}>
                    <ChevronLeftIcon onPress={()=> navigation.goBack()} size={30} strokeWidth={2.5} color='white'></ChevronLeftIcon>
                </TouchableOpacity>
                
            </SafeAreaView>

            {loading ? (<Loading></Loading>):(
                    
                    <View>
                        <View>
                            <Image
                                source = {{uri:image500(detail.profile_path)}}
                                style={tw`w-full h-[${height*0.14}]`}
                            ></Image>
                            <LinearGradient 
                                colors ={['transparent','rgba(0,0,0,0.1)','rgba(0,0,0,1)']}
                                start={{x:0.5, y:0}}
                                end= {{x:0.5,y:1}}
                                style={tw`w-full h-[${height*0.07}] absolute bottom-0`}
                            />
                        </View>
         
                        <View style={tw`mt-5`}>
                            <Text style = {tw`text-white text-2xl font-bold text-center`}>
                                {detail.name}
                            </Text>
                            <Text style = {tw`text-neutral-500 text-base  text-center`}>
                                Born: {detail.place_of_birth} • {convertDate(detail.birthday)}
                            </Text>
                            
                        
                        </View>

                        <View style={tw` mt-5`}>
                            <Text style = {tw`text-white text-xl font-semibold px-4`}>
                                Biography
                            </Text>
                            <Text style = {tw`text-neutral-500 text-base  px-4`}>
                                {detail.biography}
                            </Text>
                        </View>

                        <MovieList data={personMovies} title={'Known for'} hideShowAll={true} type={'movie'}></MovieList>
                </View>
                )}
            
            
            
    </ScrollView>
  )
}