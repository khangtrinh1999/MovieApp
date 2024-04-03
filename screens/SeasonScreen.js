import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from 'react-native-heroicons/outline';
import tw from 'twrnc'
import Loading from '../components/Loading';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchSeasonDetail, image185, image500 } from '../api/MovieAPI';
import { StatusBar } from 'expo-status-bar';
import { convertDate, getPercentage, getYear } from '../components/Helper';
import * as Progress from 'react-native-progress'
const ios = Platform.OS== 'ios'

var {width,height} = Dimensions.get('window')
export default function SeasonScreen() {
    const {params:data} = useRoute();
    const navigation = useNavigation();
    const [loading,setLoading] = useState(false)
    const [episode, setEpisodes] = useState([])
    const [showEpisode, setShowEpisode] = useState(true)

    useEffect(()=>{
        getSeasonEpisodes(data?.showDetail?.id, data?.season?.season_number)
    },[])

    const getSeasonEpisodes = async (id,season_number) =>{
        setLoading(true)
        const data = await fetchSeasonDetail(id,season_number);
        if (data && data.episodes) setEpisodes(data.episodes);
        setLoading(false)
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
                <Text style={tw`text-white text-2xl font-semibold p-1`}>{data?.showDetail?.name}</Text>
                
            </SafeAreaView>

        <ScrollView
            contentContainerStyle={{paddingBottom:20}}
            style = {tw`bg-black`}
        >
            <View >  
            {loading?(<Loading></Loading>):(
                <View>
                    <View style={tw`justify-center items-center`}>
                        <View style={tw`rounded-xl overflow-hidden border border-neutral-900 `}>
                            <Image
                                source = {{uri:image500(data.season.poster_path)}}
                                style={tw`w-[${width*0.16}] h-[${height*0.12}]`}
                            ></Image>
                            <LinearGradient 
                                colors ={['transparent','rgba(0,0,0,0.8)','rgba(0,0,0,1)']}
                                start={{x:0.5, y:0}}
                                end= {{x:0.5,y:1}}
                                style={tw`w-full h-[${height*0.07}] absolute bottom-0`}
                            />
                        </View>
                        <View style={{marginTop: -(height*0.15)}}>
                            <View style={tw`justify-center items-center mb-3`}>
                                    <Progress.Circle
                                    progress={getPercentage(data?.season?.vote_average)}
                                    color='rgba(220, 38, 38, 1)'
                                    unfilledColor='rgba(220, 38, 38, 0.3)'
                                    borderWidth={0}
                                    showsText={true}
                                    textStyle={tw`text-2xl font-bold`}
                                    animated={false}
                                    thickness={7}
                                    size={80}
                                    fill='rgba(0,0 ,0,0.6)'
                                    ></Progress.Circle>
                                    <Text style={tw`text-white text-4xl font-semibold text-center mt-3`}>
                                        {data?.season?.name}
                                    </Text>
                                    <Text style={tw`text-neutral-400 text-4xl font-semibold text-center mt-1`}>
                                        {getYear(data?.season?.air_date) }
                                    </Text>
                                </View>
                        </View>
                        
                    </View>
                    {/* Overview Render */}
                    {(data?.season?.overview) && (
                        <View>
                            <Text style={tw`text-white font-semibold text-xl mx-3 mt-2 `}>Overview</Text>
                            <Text style={tw`text-neutral-400 text-base font-semibold mx-3 mt-1`}>
                                {data?.season?.overview}
                            </Text>
                        </View>
                    )}
                    

                    {/* Episode Render */}
                    <TouchableOpacity
                            style={tw`flex-row mx-3 bg-black rounded-3xl items-center mt-2`}
                            onPress={()=>setShowEpisode(!showEpisode)}
                        >   
                            <Text style={tw`text-white font-semibold text-xl mr-2`}>Episodes ({data?.season?.episode_count})</Text>
                            {showEpisode?(<ChevronUpIcon size="20" color='white' strokeWidth={2}></ChevronUpIcon>):(<ChevronDownIcon size="20" color="white" strokeWidth={2}></ChevronDownIcon>)}
                        </TouchableOpacity>
                    
                    {(showEpisode) && (
                    <View style={tw` w-full gap-3 mx-3 mt-3 `}>
                            {episode?.map((episode,index)=>{
                                return (
                                    <View key={index} style={tw` justify-between items-center rounded-xl overflow-hidden w-100 bg-neutral-950 border border-neutral-800 pb-2`}>
                                        <View style={tw`flex-col`}>
                                            <Image
                                                source = {{uri:image500(episode?.still_path)}}
                                                style={tw` w-100 h-70`}
                                            ></Image>
                                            <View style={tw`mt-1`}>
                                                
                                                <Text style={tw`text-white font-semibold text-xl mx-3`}>{episode?.episode_number}. {episode?.name}</Text>
                                                <Text style={tw`text-neutral-400 text-base mx-3 mt-1`}> <Text style={tw`text-red-700 text-base mx-3 font-bold ${(episode?.vote_average==0)?'hidden':''}`}>&#9733; {episode?.vote_average?.toPrecision(2)}</Text> • {convertDate(episode?.air_date) }  {episode?.runtime} mins</Text>
                                                <Text style={tw`text-neutral-400 text-base mx-3 mt-1`}>{episode.overview}</Text>
                                            </View>
                                        </View>
                                        {/* <View style={tw`flex-col-reverse py-3 `}>
                                            <View style={tw`flex-row items-center justify-center`}>
                                                    <Text style={tw`text-neutral-400 text-sm font-semibold`}>More Details</Text>
                                                    <ChevronRightIcon size="18" color="#737373" strokeWidth={2} ></ChevronRightIcon>
                                            </View>
                                            
                                        </View> */}
                                        
                                    </View>
                                 
                                    
                                )
                            })}
                        </View>)}
                </View>
            )}
            </View>
        </ScrollView>
     </View>

       
  )
}