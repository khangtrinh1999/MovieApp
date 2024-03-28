import { View, Text, TouchableWithoutFeedback, Dimensions,Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { image500 } from '../../api/MovieAPI'
var {width,height} = Dimensions.get('window')
export default function TrendingMovies({data}) {
  const navigation = useNavigation()
  const handleClick = (item) =>{
    navigation.push('Movie',item);
  }
  return (
    <View style={tw`mb-5`}>
      <Text style={tw`text-white text-xl mx-4 mb-5 font-semibold`}>Trending </Text>
      <Carousel
        data={data}
        renderItem={({item})=> <MovieCard item={item} handleClick={handleClick}></MovieCard>}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.57}
        slideStyle ={{display:'flex',alignItems:'center'}}
      >

      </Carousel>
    </View>
  );
}

const MovieCard =({item, handleClick}) =>{

  return(
    <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
       
          <Image
          source = {{uri:image500(item.poster_path)}}
          style={tw`rounded-3xl w-[${width*0.14}] h-[${height*0.10}]`}
          ></Image>

       
        
    </TouchableWithoutFeedback>
  );
}