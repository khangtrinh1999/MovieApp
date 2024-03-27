import { View, Text, TouchableWithoutFeedback, Dimensions,Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
var {width,height} = Dimensions.get('window')
export default function trendingMovies({data}) {
  const navigation = useNavigation()
  const handleClick = () =>{
    navigation.navigate('Movie',item);
  }
  return (
    <View style={tw`mb-8`}>
      <Text style={tw`text-white text-xl mx-4 mb-5 font-bold`}>Trending </Text>
      <Carousel
        data={data}
        renderItem={({item})=> <MovieCard item={item} handleClick={handleClick}></MovieCard>}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.60}
        slideStyle ={{display:'flex',alignItems:'center'}}
      >

      </Carousel>
    </View>
  );
}

const MovieCard =({item, handleClick}) =>{
  return(
    <TouchableWithoutFeedback>
       
          <Image
          source = {require('/Users/khangtrinh/react_native_project/MovieApp/assets/opp.jpg')}
          style={tw`rounded-3xl w-[${width*0.15}] h-[${height*0.1}]`}
          ></Image>

       
        
    </TouchableWithoutFeedback>
  );
}