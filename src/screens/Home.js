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
} from 'react-native';
import {MovieItem} from '../components/MovieItem';
import {MovieItemLayout} from '../components/MovieItemLayout';
import axios from 'axios';
import {heightToDp, widthToDp} from '../utils/Dimensions';

import {addBookmark, removeBookmark} from '../redux/actions/action';
import {useSelector, useDispatch} from 'react-redux';

export default function Home(props) {
  const [movie, setMovie] = useState();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  const [queryPage, setQueryPage] = useState(1);
  const [isLayout, setIsLayout] = useState(false);
  const [likeMovies, setLikeMovies] = useState();

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

  useEffect(() => {
    getMovie();
  }, [page]);

  LoadMore = () => {
    setPage(page + 1);
  };

  const renderMovie = ({item}) => {
    return (
      <MovieItem
        item={item}
        onPress={() =>
          props.navigation.navigate('Movie details', {
            item: item,
          })
        }
        onLike={() =>
          ifExists(item) ? handleRemoveBookmark(item) : handleAddBookmark(item)
        }
        isLiked={ifExists(item) ? true : false}
      />
    );
  };

  const renderSingleCard = ({item}) => {
    return (
      <MovieItemLayout
        item={item}
        onPress={() =>
          props.navigation.navigate('Movie details', {
            item: item,
          })
        }
        onLike={() =>
          ifExists(item) ? handleRemoveBookmark(item) : handleAddBookmark(item)
        }
        isLiked={ifExists(item) ? true : false}
      />
    );
  };

  const isLayoutChanged = () => {
    setIsLayout(!isLayout);
  };

  const handleSearch = () => {
    const formattedQuery = query.toLowerCase();

    if (formattedQuery.length === 0) {
      getMovie();
      setPage(1);
    } else if (formattedQuery.length > 3) {
      setQueryPage(1);
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=579c7fc7840ab037036071939351dc60&query=${formattedQuery}&page=${queryPage}`,
        )
        .then(async res => {
          queryPage === 1
            ? setMovie(res.data.results)
            : setMovie([...movie, ...res.data.results]);
        })
        .catch(error => {
          console.log('error ' + error);
        });
    }
  };

  const getMovie = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=579c7fc7840ab037036071939351dc60&page=${page}`,
      )
      .then(async res => {
        page === 1
          ? setMovie(res.data.results)
          : setMovie([...movie, ...res.data.results]);
      })
      .catch(error => {
        console.log('error ' + error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor: 'white',
      }}>
      <View
        style={{
          backgroundColor: '#E4E4E4',
          padding: 10,
          marginVertical: 10,
          marginHorizontal: 20,

          borderRadius: 20,
          width: widthToDp(90),
          justifyContent: 'center',
        }}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={query}
          clearButtonMode="always"
          onSubmitEditing={queryText => handleSearch(queryText)}
          onChangeText={queryText => setQuery(queryText)}
          placeholder="Search"
          style={{backgroundColor: '#E4E4E4', paddingHorizontal: 20}}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            color: 'gray',
            marginLeft: 20,

            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Most Popular
        </Text>
        <TouchableOpacity onPress={isLayoutChanged}>
          <Image
            resizeMode="contain"
            style={{
              height: widthToDp(5),
              width: widthToDp(5),
              alignSelf: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}
            source={
              isLayout
                ? require('../assets/squares.png')
                : require('../assets/two-rows-layout.png')
            }
          />
        </TouchableOpacity>
      </View>
      <FlatList
        //ListHeaderComponent={renderHeader}
        key={isLayout ? 1 : 2}
        numColumns={isLayout ? 1 : 2}
        keyExtractor={(item, index) => index.toString()}
        data={movie}
        renderItem={isLayout ? renderSingleCard : renderMovie}
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={3}
        onEndReached={LoadMore}
      />
    </SafeAreaView>
  );
}
