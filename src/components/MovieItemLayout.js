import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import {widthToDp} from '../utils/Dimensions';

export const MovieItemLayout = props => {
  const [genreList, setGenreList] = useState([]);
  let genres = [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ];

  useEffect(() => {
    setGenreList(mapGenre(genres, props.item.genre_ids));
  }, []);

  function mapGenre(genres, genre_ids) {
    let genreList = [];
    for (let i = 0; i < genre_ids.length; i++) {
      for (let j = 0; j < genres.length; j++) {
        if (genres[j].id == genre_ids[i]) {
          genreList.push(genres[j].name);
        }
      }
    }

    return genreList;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.item.poster_path}`,
        }}
        resizeMode="stretch"
        style={{
          width: widthToDp(35),
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
      </ImageBackground>
      <View
        style={{
          flexDirection: 'column',
          margin: 10,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
            marginRight: widthToDp(50),
          }}>
          {props.item.original_title}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View>
            <Text style={{}}>
              {props.item.release_date.slice(0, 4)} |{' '}
              {props.item.original_language.toUpperCase()}
            </Text>
            <Text style={{fontSize: 10, color: 'gray', marginTop: 2}}>
              {genreList.join('/')}
            </Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text
              style={{
                color: 'black',
              }}>
              {props.item.vote_average}
            </Text>
            <Text
              style={{
                color: 'black',
              }}>
              {props.item.adult ? 'Adult' : 'Public'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
