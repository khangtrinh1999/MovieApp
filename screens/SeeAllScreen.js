import { View, Text, TouchableOpacity, Platform, TextInput, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, XMarkIcon, MagnifyingGlassIcon, ChevronLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native'
import { debounce } from 'lodash'
import { fetchSearchMovies, fetchTopRateShows, fetchTopRatedMovies, fetchUpcomingMovies } from '../api/MovieAPI'
import MovieList, { FullScreenMovieList } from '../components/trendingMovies/MovieList'
import Loading from '../components/Loading'
import { topRateMovies, topRatedShows, upcomingMovies } from '../constant'
const ios = Platform.OS== 'ios'
export default function SeeAllScreen() {
    const {params:props} = useRoute();
    const navigation = useNavigation()
    const [searchResult,setSearchResult] = useState([])
    const [currPage,setCurrPage] = useState(1)
    const [loadPage,setLoadPage] = useState(2)
    const [loading,setLoading] = useState(false)
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 0;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };

    
    useEffect(()=>{
        if(props){
            setSearchResult(props.data)
        }
        
    },[props])
    const handleSearchMore = () =>{
        
        const query = {
            language : 'en-US',
            page:  loadPage.toString(),
        }
        if (props.title == upcomingMovies){
                fetchUpcomingMovies(query).then(
                data=>{
                    if (data && data.results){
                        const buff = searchResult.concat(data.results) 
                        setSearchResult(buff)  
                    } 
                    if (data && data.page) setLoadPage(Number(data.page)+1)
                   
                }
            )
        }   
        else if (props.title == topRateMovies){
            fetchTopRatedMovies(query).then(
                data=>{
                    if (data && data.results){
                        const buff = searchResult.concat(data.results) 
                        setSearchResult(buff)  
                    } 
                    if (data && data.page) setLoadPage(Number(data.page)+1)
                   
                }
            )
        }
        else if (props.title == topRatedShows){
            fetchTopRateShows(query).then(
                data=>{
                    if (data && data.results){
                        const buff = searchResult.concat(data.results) 
                        setSearchResult(buff)  
                    } 
                    if (data && data.page) setLoadPage(Number(data.page)+1)
                   
                }
            )
        }
        
           
    }
    
  return (
    <View style={tw`flex-1 bg-black`}>
        <SafeAreaView style={tw`${ios? "-mb-2":"mb-3"} flex-row`}>
                <StatusBar style="light"/>
                <View style={tw`flex-row  items-center mx-1`}>
                    <TouchableOpacity style={tw`rounded-xl p-1 mx-1`}>
                        <ChevronLeftIcon onPress={()=> navigation.goBack()} size={30} strokeWidth={2.5} color='white'/>
                    </TouchableOpacity>
                    
                </View>
                <Text style={tw`text-white text-2xl font-semibold p-1`}>{props.title}</Text>
            </SafeAreaView>
            {loading&&(<Loading></Loading>)}
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style = {tw`flex-1`}
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        handleSearchMore();
                    }
                  }}
                  scrollEventThrottle={400}
                >
                <FullScreenMovieList data={searchResult} type={props.type} ></FullScreenMovieList>
                
            </ScrollView>
            
            
    </View>
  )
}