import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'
import tw from 'twrnc'
const {width,height} = Dimensions.get('window')
export default function Loading() {
  return (
    <View style = {tw`w-full h-full flex-row justify-center items-center`}>
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={'rgba(220, 38, 38, 1)'}
      >

      </Progress.CircleSnail>
    </View>
  )
}