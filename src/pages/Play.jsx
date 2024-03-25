import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import Video from 'react-native-video';

const dummy_video_list = [
  {
    id: 1,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    user: 'Leemingguzi_naozzang',
    contents: '너무 귀여운 아기 고양이~~',
    like: 2320,
    comments: 64,
  },
  {
    id: 1,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    user: 'Leemingguzi_naozzang',
    contents: '너무 귀여운 아기 고양이~~',
    like: 2320,
    comments: 64,
  },
  {
    id: 2,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    user: '두번째 비디오',
    contents: '두번째 비디오 입니다~~',
    like: 300,
    comments: 42,
  },
  {
    id: 3,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    user: '세번째 비디오',
    contents: '세번째 비디오 입니다~~',
    like: 300,
    comments: 42,
  },
  {
    id: 4,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    user: '네번째 비디오',
    contents: '네번째 비디오 입니다~~',
    like: 300,
    comments: 42,
  },
  {
    id: 5,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    user: '다섯번째 비디오',
    contents: '다섯번째 비디오 입니다~~',
    like: 300,
    comments: 42,
  },
  {
    id: 6,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    user: '여섯번째 비디오',
    contents: '여섯번째 비디오 입니다~~',
    like: 300,
    comments: 42,
  },
  {
    id: 7,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    user: '일곱번째 비디오',
    contents: '일곱번째 비디오 입니다~~',
    like: 300,
    comments: 42,
  },
  {
    id: 8,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    user: '여덟번째 비디오',
    contents: '여덟번째 비디오 입니다~~',
    like: 300,
    comments: 42,
  },
  {
    id: 9,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    user: '아홉번째 비디오',
    contents: '아홉번째 비디오 입니다~~',
    like: 300,
    comments: 42,
  },
];

const heartIcon = require('../assets/icons/white_heart.png');
const commentIcon = require('../assets/icons/white_comment.png');

const Play = () => {
  const {width, height} = useWindowDimensions();

  const renderItem = ({item}) => {
    return (
      <View>
        <Video
          source={{uri: item.url}}
          resizeMode="cover"
          playInBackground={false}
          playWhenInactive={false}
          repeat={true}
          rate={1}
          style={{
            width,
            height: height - 60,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width,
            height: 140,
            backgroundColor: '#000',
            opacity: 0.2,
          }} //설명이 하얀 동영상일때 잘 안보이므로 View로 반투명하게 배경화면을 줌
        />
        <View style={{position: 'absolute', bottom: 52}}>
          <View
            style={{
              marginHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{uri: 'http://picsum.photos/130/130'}}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  marginRight: 4,
                }}
              />
              <Text style={{fontSize: 16, fontWeight: '400', color: '#FFF'}}>
                {item.user}
              </Text>
              <TouchableOpacity
                style={{
                  marginLeft: 8,
                  borderWidth: 1,
                  borderColor: '#FFF',
                  borderRadius: 4,
                  paddingVertical: 6,
                  paddingHorizontal: 8,
                }}>
                <Text style={{fontSize: 16, color: '#FFF'}}>팔로우</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: '#FFF',
              marginLeft: 16,
            }}>
            {item.contents}
          </Text>
        </View>
        <View style={{position: 'absolute', bottom: 24, right: 16}}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Image source={heartIcon} style={{width: 40, height: 40}} />
            <Text style={{fontSize: 13, color: '#FFF'}}>
              {item.like.toLocaleString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Image source={commentIcon} style={{width: 40, height: 40}} />
            <Text style={{fontSize: 13, color: '#FFF'}}>
              {item.comments.toLocaleString()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View>
        <FlatList
          data={dummy_video_list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          snapToInterval={height - 60} //넘길때 height만큼 넘김
          snapToAlignment="start" //snap 시작점
          decelerationRate={'fast'} //빠르게 넘어감
        />
      </View>
    </SafeAreaView>
  );
};

export default Play;
