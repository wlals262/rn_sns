import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Linking,
  Image,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

//안드로이드 앨범 권한
async function requestStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: '저장소 권한 요청',
        message: '앱에서 사진을 사용하려면 저장소 권한이 필요합니다.',
        buttonNeutral: '나중에 다시 묻기',
        buttonNegative: '거부',
        buttonPositive: '승인',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('저장소 권한이 부여되었습니다.');
      return true;
    } else {
      console.log('저장소 권한이 거부되었습니다.');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}

// 앱 실행 시 권한을 요청할 때 호출할 함수
async function requestAndCheckStoragePermission() {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    // 사용자가 권한을 거부한 경우
    if (Platform.OS === 'android') {
      // 안드로이드에서 설정으로 이동
      // Linking.openSettings();
      console.log('권한이 거부되었습니다.');
    }
  } else {
    console.log('권한이 부여되었습니다.');
  }
}

const Add = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [selectedIndex, setSelectedIndex] = useState();

  const {width, height} = useWindowDimensions();

  useEffect(() => {
    // requestAndCheckStoragePermission();
    FetchImages();
  }, []);

  const FetchImages = async () => {
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',
      groupTypes: 'All',
    }).then(res => {
      if (!selectedPhoto) {
        setSelectedPhoto(res.edges[0].node.image);
        setSelectedIndex(0);
      }

      setImages(res.edges.map(e => e.node.image));
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{borderWidth: 1, borderColor: '#FFF'}}
        onPress={() => {
          setSelectedPhoto(item);
          setSelectedIndex(index);
        }}>
        {selectedIndex === index && (
          <View
            style={{
              position: 'absolute',
              right: 8,
              top: 2,
              width: 20,
              height: 20,
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 20,
              zIndex: 2,
            }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: 'green',
              }}
            />
          </View>
        )}
        <Image
          source={item}
          style={{width: width / 4 - 2, height: width / 4 - 2}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 16,
          marginBottom: 8,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 24, color: '#FFF', fontWeight: 'bold'}}>
            X
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 15, color: '#FFF', fontWeight: 'bold'}}>
          새 게시물
        </Text>
        <TouchableOpacity>
          <Text style={{fontSize: 14, color: '#FFF', fontWeight: 'bold'}}>
            다음
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#000', flex: 0.5}}>
        <Image
          source={{uri: selectedPhoto?.uri}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View style={{flex: 0.5}}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={item => item.uri}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        />
      </View>
    </SafeAreaView>
  );
};

export default Add;
