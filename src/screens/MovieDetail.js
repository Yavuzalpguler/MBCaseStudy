import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import MovieItem from '../components/MovieItem';
import axios from 'axios';
import {heightToDp, width, widthToDp} from '../utils/Dimensions';

import {addBookmark, removeBookmark} from '../redux/actions/action';
import {useSelector, useDispatch} from 'react-redux';

export default function MovieDetail(props) {
  const {item} = props.route.params;
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [isTruncatedText, setIsTruncatedText] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [credits, setCredits] = useState();
  const [technical, setTechnical] = useState();
  const [isLiked, setIsLiked] = useState();

  useEffect(() => {
    getDetail();
    console.log(credits);
  }, []);

  const {bookmarks} = useSelector(state => state.movieReducer);
  const dispatch = useDispatch();
  const addToBookmarkList = movie => dispatch(addBookmark(movie));
  const removeFromBookmarkList = movie => dispatch(removeBookmark(movie));
  const handleAddBookmark = movie => {
    addToBookmarkList(movie);
  };
  const handleRemoveBookmark = movie => {
    removeFromBookmarkList(movie);
  };
  const ifExists = movie => {
    if (bookmarks.filter(item => item.id === movie.id).length > 0) {
      return true;
    }

    return false;
  };

  const getDetail = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${item.id}?api_key=579c7fc7840ab037036071939351dc60`,
      )
      .then(async res => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log('error ' + error);
      });

    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=579c7fc7840ab037036071939351dc60&language=en-US`,
      )
      .then(async res => {
        setCredits(res.data.cast);
        setTechnical(res.data.crew);
        setLoading(false);
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  return (
    <>
      {!loading ? (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <ScrollView>
            <Image
              style={{
                height: heightToDp(50),
                width: widthToDp(100),
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
              }}
            />
            <TouchableOpacity
              onPress={() =>
                ifExists(item)
                  ? handleRemoveBookmark(item)
                  : handleAddBookmark(item)
              }
              style={{
                position: 'absolute',
                top: heightToDp(45),
                right: widthToDp(10),
              }}>
              <Image
                style={{
                  height: heightToDp(11),
                  width: widthToDp(12),
                }}
                source={
                  ifExists(item)
                    ? require('../assets/redH.png')
                    : require('../assets/heart.png')
                }
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'column',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 30,
                }}>
                <Text
                  style={{
                    color: '#575757',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Duration
                </Text>
                <Text
                  style={{
                    color: '#575757',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Genre
                </Text>
                <Text
                  style={{
                    color: '#575757',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Language
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',

                  marginTop: -heightToDp(3),
                }}>
                <Text
                  style={{
                    color: '#575757',
                    fontSize: 14,
                  }}>
                  {Math.floor(details.runtime / 60)}h{' '}
                  {Math.round(details.runtime % 60)}m
                </Text>
                <Text
                  style={{
                    color: '#575757',

                    fontSize: 14,
                  }}>
                  {details.genres[0]?.name}/{'\n'} {details.genres[1]?.name}
                </Text>
                <Text
                  style={{
                    color: '#575757',
                    fontSize: 14,
                  }}>
                  {details.spoken_languages[0]?.english_name}
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: '#575757',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: heightToDp(5),
                paddingLeft: widthToDp(7),
              }}>
              {details?.original_title}
            </Text>

            {isTruncatedText ? (
              <>
                <Text
                  style={{
                    color: '#575757',
                    paddingHorizontal: widthToDp(7),
                    marginTop: heightToDp(5),
                  }}
                  numberOfLines={showMore ? 3 : 0}>
                  {details.overview}
                </Text>
                <Text
                  style={{
                    color: 'red',
                    paddingHorizontal: widthToDp(7),
                    alignSelf: 'flex-end',
                    marginTop: heightToDp(2),
                  }}
                  onPress={() => setShowMore(!showMore)}>
                  {showMore ? 'Read More' : 'Less'}
                </Text>
              </>
            ) : (
              <Text
                style={{
                  color: '#575757',
                  paddingHorizontal: widthToDp(7),

                  marginTop: heightToDp(5),
                }}
                onTextLayout={event => {
                  const {lines} = event.nativeEvent;
                  setIsTruncatedText(lines?.length > 3);
                }}>
                {details.overview}
              </Text>
            )}

            <Text
              style={{
                color: '#575757',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: heightToDp(5),
                paddingLeft: widthToDp(7),
              }}>
              Main Cast
            </Text>

            <FlatList
              //ListHeaderComponent={renderHeader}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              data={credits}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    marginTop: 20,
                    paddingLeft: widthToDp(3),
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      color: '#575757',
                      marginBottom: 10,
                      paddingHorizontal: 20,
                    }}>
                    {item.name}
                  </Text>
                  <Image
                    style={{
                      height: widthToDp(20),
                      width: widthToDp(20),
                      alignSelf: 'center',
                      justifyContent: 'center',
                      borderRadius: widthToDp(10),
                    }}
                    source={
                      item.profile_path
                        ? {
                            uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
                          }
                        : require('../assets/placeholder.png')
                    }
                  />
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              onEndReachedThreshold={3}
              onEndReached={LoadMore}
            />

            <Text
              style={{
                color: '#575757',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: heightToDp(7),
                paddingLeft: widthToDp(7),
              }}>
              Main Technical Team
            </Text>

            <FlatList
              //ListHeaderComponent={renderHeader}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              data={technical}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    marginTop: 20,
                    paddingLeft: widthToDp(3),
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      color: '#575757',
                      marginBottom: 10,
                      paddingHorizontal: 20,
                    }}>
                    {item.name}
                  </Text>
                  <Image
                    style={{
                      height: widthToDp(20),
                      width: widthToDp(20),
                      alignSelf: 'center',
                      justifyContent: 'center',
                      borderRadius: widthToDp(10),
                    }}
                    source={
                      item.profile_path
                        ? {
                            uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
                          }
                        : require('../assets/placeholder.png')
                    }
                  />
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              onEndReachedThreshold={3}
              onEndReached={LoadMore}
            />
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View></View>
      )}
    </>
  );
}
