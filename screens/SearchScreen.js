import { View, Text, TouchableOpacity, Platform, TextInput, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, XMarkIcon, MagnifyingGlassIcon, ChevronLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { debounce } from 'lodash'
import { fetchSearchMovies } from '../api/MovieAPI'
import MovieList, { FullScreenMovieList, SearchMovieList } from '../components/trendingMovies/MovieList'
import Loading from '../components/Loading'
const ios = Platform.OS== 'ios'
export default function SearchScreen() {
    const navigation = useNavigation()
    const [searchResult,setSearchResult] = useState([])
    const [resultCount, setResultCount] = useState(0)
    const [currPage,setCurrPage] = useState(1)
    const [currQuerry,setCurrQuerry] = useState('')
    const [loadPage,setLoadPage] = useState(1)
    const [loading,setLoading] = useState(false)
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 0;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };

    const handleSearch = value =>{
        setLoading(true)
        if (value && value.length > 2) {
            setCurrQuerry(value)
            const query = {
                query: value,
                include_adult: 'false',
                language : 'en-US',
                page: '1',
            }
            fetchSearchMovies(query).then(
                data=>{
                    if (data && data.results){
                        setSearchResult(data.results)  
                    } 
                    if (data && data.total_results) setResultCount(data.total_results)
                    if (data && data.page) setLoadPage(Number(data.page)+1)
                    if (data && data.total_pages) setCurrPage(data.total_pages)
                    setLoading(false)
                }
            )
        }
        else{
            setSearchResult([])
            setResultCount(0)
            setLoading(false)
        }
    }
    const handleTextDebounce = (value)=>{
        setTimeout(() => {
            handleSearch(value)
          }, 400);
          
    }

    const handleSearchMore = () =>{
      
        const value = currQuerry
        if (value && value.length > 2 && loadPage<=currPage) {
            const query = {
                query: value,
                include_adult: 'false',
                language : 'en-US',
                page:  loadPage.toString(),
            }
            fetchSearchMovies(query).then(
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
        <SafeAreaView style={tw`${ios? "-mb-2":"mb-3"}`}>
                <StatusBar style="light"/>
                <View style={tw`flex-row  items-center mx-1 `}>
                    <TouchableOpacity style={tw`rounded-xl p-1 mx-2`}>
                        <ChevronLeftIcon onPress={()=> navigation.goBack()} size={30} strokeWidth={2.5} color='white'></ChevronLeftIcon>
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={handleTextDebounce}
                        placeholder='Search tilte'
                        style ={tw`text-white bg-neutral-900 w-90  rounded-xl px-2 py-2 text-xl`}
                        onchange
                    >

                    </TextInput>
                </View>
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
                
                {<Text style={tw`text-white text-base font-semibold ml-3`}>Results ({resultCount.toString()})</Text>}
                <SearchMovieList data={searchResult}  ></SearchMovieList>
                
            </ScrollView>
            
            
    </View>
  )
}