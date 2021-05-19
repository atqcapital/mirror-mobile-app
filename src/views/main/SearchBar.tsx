import React, { useContext } from 'react'
import { Animated, Image, Text, Platform, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { ConfigContext } from '../../common/provider/ConfigProvider'
import * as Resources from '../../common/Resources'
import { BlurView } from '@react-native-community/blur'
const SearchBar = (props: { setShowSearchView: (t: boolean) => void }) => {
  const safeInsetTop = Resources.getSafeLayoutInsets().top
  const { translations } = useContext(ConfigContext)
  return (
    <>
      {/* <View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    overflow: 'hidden',
                    width: '100%',
                    height: 52 + safeInsetTop,
                }}
            >
                {Platform.OS === 'android' ? (
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: Resources.Colors.darkBackground,
                            opacity: 1,
                        }}
                    />
                ) : (
                    <BlurView style={{ width: '100%', height: '100%' }} />
                )}
            </View> */}
      {/* <View
                style={{
                    position: 'absolute',
                    left: Resources.windowSize().width,
                    top: 0,
                    overflow: 'hidden',
                    width: '100%',
                    height: 135 + safeInsetTop,
                }}
            >
                {Platform.OS === 'android' ? (
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: Resources.Colors.darkBackground,
                            opacity: 1,
                        }}
                    />
                ) : (
                    <BlurView style={{ width: '100%', height: '100%' }} />
                )}
            </View> */}
      <Animated.View
        style={{
          // transform: [{ translateY: searchBarMarginTop }],
          // position: 'absolute',
          top: 65 + safeInsetTop,
          // left: Resources.windowSize().width,
          width: Resources.windowSize().width,
          // backgroundColor: "green"
        }}
      >
        <RectButton
          style={{
            marginTop: safeInsetTop,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Resources.Colors.darkGreyFour,
            borderRadius: 16,
            height: 50,
            marginLeft: 24,
            marginRight: 24,
          }}
          onPress={() => {
            props.setShowSearchView(true)
          }}
        >
          <Image
            style={{ width: 14, height: 14, marginLeft: 16 }}
            source={Resources.Images.iconSearch}
          />
          <Text
            style={{
              marginLeft: 6,
              fontFamily: Resources.Fonts.book,
              fontSize: 14,
              letterSpacing: -0.5,
              color: Resources.Colors.greyishBrown,
            }}
          >
            {translations.mainView.searchPlaceholder}
          </Text>
        </RectButton>
      </Animated.View>
    </>
  )
}
export default SearchBar
