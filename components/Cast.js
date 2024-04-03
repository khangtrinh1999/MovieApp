import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
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
                        <View style={tw`overflow-hidden rounded-full h-30 w-30 items-center border border-neutral-500`}>
                            <Image
                                style={tw`rounded-2xl h-34 w-30`}
                                source = {{uri:image185(person.profile_path)}}
                            >
                                
                            </Image>
                        </View>
                        {(person.character)?(
                          <Text style={tw`text-white text-xs mt-1`}>
                            {person.character?.length> 20? person.character?.slice(0,20)+'...':person.character}
                          </Text>
                        ):(
                          <Text style={tw`text-white text-xs mt-1`}>
                            {person.job?.length> 20? person.job?.slice(0,20)+'...':person.job}
                          </Text>
                        )}
                        
                        <Text style={tw`text-neutral-400 text-xs mt-1`}>
                            {person.name.length > 20? person.name?.slice(0,20)+'...':person.name}
                        </Text>
                    </TouchableOpacity>
                )
                
                
            })
        }
      </ScrollView>
    </View>
  )
}