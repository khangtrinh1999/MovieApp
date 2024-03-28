import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
export default function Cast({cast,navigation}) {
    characterName = 'John Wick'
    actorName = 'Keanu Reeves'
  return (
    <View>
      <Text style={tw`text-white font-semibold text-xl mx-3 mb-5 mt-3`}>Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle= {{paddingHorizontal:15}}
      >
        {
            cast && cast.map((person,index)=>{
                return(
                    <TouchableOpacity
                        key={index}
                        style={tw`mr-4 items-center`}
                        onPress={()=>navigation.navigate('Person',person)}
                    >   
                        <View style={tw`overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500`}>
                            <Image
                                style={tw`rounded-2xl h-24 w-20`}
                                source = {require('/Users/khangtrinh/react_native_project/MovieApp/assets/cillian.jpg')}
                            >
                                
                            </Image>
                        </View>
                        <Text style={tw`text-white text-xs mt-1`}>
                            {characterName.length > 10? characterName.slice(0,10)+'...':characterName}
                        </Text>
                        <Text style={tw`text-neutral-400 text-xs mt-1`}>
                            {actorName.length > 10? actorName.slice(0,10)+'...':actorName}
                        </Text>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </View>
  )
}