import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'
import tw from 'twrnc'
const {width,height} = Dimensions.get('window')
export default function Loading() {
  return (
    <View style = {tw`w-full h-180 flex-row justify-center items-center`}>
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={'rgb(234 179 8)'}
      >

      </Progress.CircleSnail>
    </View>
  )
}