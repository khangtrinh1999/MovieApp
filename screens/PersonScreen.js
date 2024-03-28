import { View, Text, Dimensions, ScrollView,TouchableOpacity,SafeAreaView,Image } from 'react-native'
import React, { useState } from 'react'
var {width,height} = Dimensions.get('window')
import tw from 'twrnc'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import MovieList from '../components/trendingMovies/MovieList'
import Loading from '../components/Loading'
export default function PersonScreen() {
    navigation = useNavigation()
    const [personMovies, setPersonMovies] = useState([1,1,1,1,1])
    const [loading,setLoading] = useState(false)
  return (
    <ScrollView
        style ={tw`flex-1 bg-neutral-900`}
        contentContainerStyle={{paddingBottom:20}}
    >
            <SafeAreaView style ={tw`z-20 flex-row justify-between items-center w-full px-4 `}>
                <TouchableOpacity style={tw`rounded-xl p-1`}>
                    <ChevronLeftIcon onPress={()=> navigation.goBack()} size={30} strokeWidth={2.5} color='white'></ChevronLeftIcon>
                </TouchableOpacity>
                
            </SafeAreaView>

            {loading ? (<Loading></Loading>):(
                    
                    <View>
   
            <View style={tw`flex-row justify-center shadow-xl shadow-gray-400`}>
                <View style={tw`overflow-hidden rounded-full h-72 w-72 items-center border border-neutral-500`}>
                    <Image
                        style={tw`rounded-2xl h-100 w-72`}
                        source = {require('/Users/khangtrinh/react_native_project/MovieApp/assets/cillian.jpg')}
                    >
                        
                    </Image>
                </View>
            </View>
                <View style={tw` mt-5`}>
                    <Text style = {tw`text-white text-2xl font-bold text-center`}>
                        Keanu Reeves
                    </Text>
                    <Text style = {tw`text-neutral-500 text-base  text-center`}>
                        Born: United Kingdom • 18/07/1999
                    </Text>
                    <Text style = {tw`text-neutral-500 text-base  text-center`}>
                        Gender : Male
                    </Text>
                
                </View>

                <View style={tw` mt-5`}>
                    <Text style = {tw`text-white text-xl font-semibold px-4`}>
                        Biography
                    </Text>
                    <Text style = {tw`text-neutral-500 text-base  px-4`}>
                    Murphy was born on 25 May 1976 in Douglas, Cork. His mother taught French while his father, Brendan, worked for the Department of Education. His grandfather, aunts, and uncles were also teachers. He was raised in Ballintemple, Cork, alongside his younger brother Páidi and two younger sisters Sile and Orla.
                    </Text>
                </View>

                <MovieList data={personMovies} title={'Known for'} hideShowAll={true}></MovieList>
            </View>
                    )}
            
            
            
    </ScrollView>
  )
}