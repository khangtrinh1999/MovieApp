import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { image185 } from '../api/MovieAPI'
export default function Cast({cast,navigation}) {
  return (
    <View>
      <Text style={tw`text-white font-semibold text-xl mx-3 mb-3 mt-3`}>Cast</Text>
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
                        onPress={()=>navigation.push('Person',person)}
                    >   
                        <View style={tw`overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500`}>
                            <Image
                                style={tw`rounded-2xl h-24 w-20`}
                                source = {{uri:image185(person.profile_path)}}
                            >
                                
                            </Image>
                        </View>
                        <Text style={tw`text-white text-xs mt-1`}>
                            {person.character.length> 10? person.character?.slice(0,10)+'...':person.character}
                        </Text>
                        <Text style={tw`text-neutral-400 text-xs mt-1`}>
                            {person.name.length > 10? person.name?.slice(0,10)+'...':person.name}
                        </Text>
                    </TouchableOpacity>
                )
                
                
            })
        }
      </ScrollView>
    </View>
  )
}