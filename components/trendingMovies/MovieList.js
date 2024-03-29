import { View, Text, TouchableWithoutFeedback, Dimensions,Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import tw from 'twrnc'

import { useNavigation } from '@react-navigation/native'
import { image185 } from '../../api/MovieAPI'
var {width,height} = Dimensions.get('window')

export default function MovieList({data,title,hideShowAll}) {
    const movieName = 'Oppenheimer'
    const navigation = useNavigation()
    const handleClick = (item) =>{
      navigation.push('Movie',item);
    }
    return (
      <View style={tw`mb-3 mt-3`}>
        <View style={tw`mx-4 flex-row justify-between items-center`}>
            <Text style={tw`text-white text-xl mb-5 font-semibold`}>{title} </Text>
            {
                !hideShowAll && (
                    <TouchableOpacity>
                     <Text style={tw`text-yellow-500 text-xl  mb-5 font-semibold`}>See All</Text>
                </TouchableOpacity>
                )
            }
            
            
        </View>
        <ScrollView
        
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15}}>
            {
                data?.slice(0,10).map((item,index)=>{
                    return(
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={()=>handleClick(item)}
                        >   
                            <View style={tw` mr-2`}>
                                <Image
                                    source = {{uri:image185(item.poster_path)}}
                                    style={tw`rounded-lg w-[${width*0.08}] h-[${height*0.06}]`}
                                ></Image>
                                <Text style={tw`text-neutral-300 ml-1 text-center mt-2 text-base`}>{
                                        item.title.length > 12 ? item.title.slice(0,12) +'...' : item.original_title
                                }</Text>
                            </View>
                            
                        </TouchableWithoutFeedback>
                    )
                })
            }

        </ScrollView>
        
      </View>
    );
  }
  
  