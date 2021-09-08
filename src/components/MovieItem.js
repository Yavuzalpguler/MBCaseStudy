import React from 'react';
import {TouchableOpacity, Text, Image, ImageBackground} from 'react-native';
import {widthToDp} from '../utils/Dimensions';

export const MovieItem = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.item.poster_path}`,
        }}
        resizeMode="stretch"
        style={{
          width: widthToDp(40),
          height: widthToDp(48),
          margin: 10,
        }}
        imageStyle={{borderRadius: 10}}>
        <TouchableOpacity
          onPress={props.onLike}
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            width: widthToDp(8),
            height: widthToDp(8),
            backgroundColor: 'transparent',
            borderRadius: 10,
          }}>
          <Image
            resizeMode="contain"
            style={{
              height: widthToDp(7),
              width: widthToDp(7),
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            source={
              props.isLiked
                ? require('../assets/redH.png')
                : require('../assets/heart.png')
            }
          />
        </TouchableOpacity>
        <Text
          style={{
            position: 'absolute',
            bottom: 5,
            left: 5,
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          {props.item.original_title}
        </Text>
      </ImageBackground>
      <Text style={{}}>
        {props.item.release_date.slice(0, 4)} |{' '}
        {props.item.original_language.toUpperCase()}
      </Text>
      <Text style={{}}>Genre</Text>
    </TouchableOpacity>
  );
};
