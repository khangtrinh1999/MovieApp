import { View, Text, TouchableWithoutFeedback, Dimensions,Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'

import { useNavigation } from '@react-navigation/native'
import { image185 } from '../../api/MovieAPI'
var {width,height} = Dimensions.get('window')

export default function MovieList({data,title,hideShowAll,type}) {

    const navigation = useNavigation()
    const handleClick = (item) =>{
        console.log(item)
        if (type == 'movie'){
            navigation.push('Movie',item);
          }
          else if (type == 'tv'){
            navigation.push('Show',item);
          }
      
    }
    return (
      <View style={tw`mb-3 mt-3`}>
        <View style={tw`mx-4 flex-row justify-between items-center`}>
            <Text style={tw`text-white text-xl mb-5 font-semibold`}>{title} </Text>
            {
                !hideShowAll && (
                    <TouchableOpacity
                        onPress={()=>{navigation.push('SeeAll',{
                            data:data,
                            title:title,
                            type:type
                        })}}
                    >
                     <Text style={tw`text-red-600 text-xl  mb-5 font-semibold`}>See All</Text>
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
                            <View style={tw` mr-2 border border-neutral-900 rounded-lg justify-end items-end`}>
                                <Image
                                    source = {{uri:image185(item.poster_path)}}
                                    style={tw`rounded-lg w-[${width*0.08}] h-[${height*0.06}]`}
                                ></Image>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })
            }

        </ScrollView>
        
      </View>
    );
  }

  export  function FullScreenMovieList({data,type}) {
    const navigation = useNavigation()
    const handleClick = (item) =>{
        if (type == 'movie'){
            navigation.push('Movie',item);
          }
          else if (type == 'tv'){
            navigation.push('Show',item);
          }
    }
    return (
            <View style={tw`flex-wrap flex-row w-full `}>
            
            {
                data?.map((item,index)=>{
                    return(
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={()=>handleClick(item)}
                        >   
                            <View style={tw` w-0.95/2  border border-neutral-900 rounded-lg my-1 mx-1`}>
                                <Image
                                    source = {{uri:image185(item.poster_path)}}
                                    style={tw`rounded-lg w-full h-80`}
                                ></Image>
      
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })
            }
            </View>
    );
  }

  export  function SearchMovieList({data,type}) {
    const navigation = useNavigation()
    const handleClick = (item) =>{
        if (item.media_type == 'movie'){
            navigation.push('Movie',item);
          }
          else if (item.media_type == 'tv'){
            navigation.push('Show',item);
          }
    }
    return (
            <View style={tw`flex-wrap flex-row w-full `}>
            
            {
                data?.map((item,index)=>{
                    if (item.media_type != 'Person')
                    return(
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={()=>handleClick(item)}
                        >   
                            <View style={tw` w-0.95/2  border border-neutral-900 rounded-lg my-1 mx-1`}>
                                <Image
                                    source = {{uri:image185(item.poster_path)}}
                                    style={tw`rounded-lg w-full h-80`}
                                ></Image>
      
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })
            }
            </View>
    );
  }
  
  
  
  