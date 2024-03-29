import { View, Text, TouchableWithoutFeedback, Dimensions,Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { fetchMovieDetails, fetchMovieVideo, image500 } from '../../api/MovieAPI'
var {width,height} = Dimensions.get('window')
import YoutubePlayer from "react-native-youtube-iframe";
import { LinearGradient } from 'expo-linear-gradient'
import {  getYear } from '../Helper'
import { ChevronRightIcon } from 'react-native-heroicons/outline'
export default function TrendingMovies({data}) {
  
  
  return (
    <View>
      <Text style={tw`text-white text-xl mx-4 font-semibold mb-3`}>Trending </Text>
      <Carousel
        data={data}
        renderItem={({item})=> <MovieCard item={item} ></MovieCard>}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.85}
        slideStyle ={{display:'flex',alignItems:'center'}}
        loop
      >
      </Carousel>
    </View>
  );
}

const MovieCard =({item}) =>{

  const [movieDetail,setMovieDetails] = useState({})
  const [movieTrailer,setMovieTrailer] = useState('')
  const [muteTrailer,setMuteTrailer] = useState(true)
  const [playTrailer,setPlayTrailer] = useState(false)
  const navigation = useNavigation()
  useEffect(()=>{
    
    getMovieDetails(item.id)
    getMovieTrailer(item.id)
    
},[item])

  const getMovieDetails = async (id) =>{
    const data = await fetchMovieDetails(id)
    if (data) setMovieDetails(data)

  }
  const getMovieTrailer = async (id) =>{
    const data = await fetchMovieVideo(id);
    if (data && data.results) {
        vid = data.results.find(video => (video.type == 'Trailer'));
        setMovieTrailer(vid?.key)
    }
  }
  const handleClick = (item) =>{
    setPlayTrailer(false)
    navigation.push('Movie',item);
  }

  return(
    <TouchableWithoutFeedback onPress={()=>setPlayTrailer(!playTrailer)}>
            <View style={tw`overflow-hidden rounded-2xl w-full h-130`}>
            {
              playTrailer
              ?(
                <View style={tw`overflow-hidden h-full w-full justify-center items-center`}>           
                  <YoutubePlayer   
                      height={'200%'}        
                      play={playTrailer}        
                      videoId={movieTrailer}        
                      width={'340%'}
                      initialPlayerParams = {{loop:1,controls:false,rel:0}}
                      playList={[movieTrailer]}
                  />
              </View>
              )
              :(
                <Image
                source = {{uri:image500(item.poster_path)}}
                style={tw`w-full h-full`}
                ></Image> 
              )
            }
              <LinearGradient 
                  colors ={['transparent','rgba(0,0,0,0.7)','rgba(0,0,0,1)']}
                  start={{x:0.5, y:0}}
                  end= {{x:0.5,y:1}}
                  style={tw`w-full h-full absolute`}
              />
              <View style={{marginTop: -(height*0.2)}}>
                <Text style={tw`text-white justify-between text-center text-2xl font-bold tracking-wider mx-3`}>{movieDetail.title}</Text> 
                <Text style={tw`text-neutral-400 font-semibold text-center text-sm  mx-3 mt-1`}>{movieDetail.vote_average?.toFixed(1)} &#9733; • {getYear(movieDetail.release_date)} • {movieDetail.runtime} min</Text>
                <Text style={tw`text-neutral-400 font-semibold text-center text-sm  mx-3 mt-1`}>{movieDetail?.genres?.map(genre => genre.name).join(' • ')}</Text>
                <View style={tw`items-center justify-center mt-3`}>
                        <TouchableOpacity
                            style={tw`flex-row  w-1/3  rounded-xl items-center justify-center`}
                            onPress={()=>handleClick(item)}
                        >   
                              <Text style={tw`text-yellow-500 text-base font-semibold`}>More Detail</Text>
                              <ChevronRightIcon size="18" color="rgb(234 179 8)" strokeWidth={2} ></ChevronRightIcon>
                              
                        </TouchableOpacity>
                </View>
              </View>
            </View>
            
    </TouchableWithoutFeedback>
  );
}