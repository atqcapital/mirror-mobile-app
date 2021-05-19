import React, { useState, useCallback, useContext, useEffect } from 'react'
import {
  Text,
  View,
  RefreshControl,
  Animated,
  NativeModules,
  Button,
  Image,
  StyleSheet,
} from 'react-native'
import * as Resources from '../../common/Resources'
import { useFocusEffect } from '@react-navigation/native'
import { ConfigContext } from '../../common/provider/ConfigProvider'
import { MainTab2ItemView } from './MainTab2ItemView'
import ThrottleButton from '../../component/ThrottleButton'
import BigNumber from 'bignumber.js'
import * as Utils from '../../common/Utils'
import * as Api from '../../common/Apis/Api'

import _ from 'lodash'
import Svg, { Path, Circle, Rect } from 'react-native-svg'
import { ScrollView } from 'react-native-gesture-handler'
import { responsePathAsArray } from 'graphql'
import SearchBar from './SearchBar'

const preferences = NativeModules.RnPreferences

export function MainTab2(props: {
  navigation: any
  selectedTab: number
  tab2ScrollY: any
  assetList: GQL_AssetList1[]
  setShowSearchView: (t: boolean) => void
}) {
  const safeInsetBottom = Resources.getSafeLayoutInsets().bottom
  const [stockList, setStockList] = useState([] as GQL_AssetList1[])
  const [favouriteList, setFavouriteList] = useState([] as GQL_AssetList1[])

  const [isRefresh, setRefresh] = useState(false)

  const [showPercent, setShowPercent] = useState(true)
  const [selectedColumn, setSelectedColumn] = useState('symbol')
  const [direction, setDirection] = useState('asc')

  useFocusEffect(
    useCallback(() => {
      if (props.selectedTab == 1) {
        load()
          .then((v) => {
            setRefresh(false)
          })
          .catch((error) => {
            setRefresh(false)
          })
      }
    }, [props.selectedTab, props.assetList])
  )

  const sortTable = (column: string) => {
    const favouriteData = [...favouriteList]
    const stockListData = [...stockList]

    const newDirection = direction === 'desc' ? 'asc' : 'desc'
    const sortedFavourites = _.orderBy(favouriteData, [column], [newDirection])
    const sortedStocks = _.orderBy(stockListData, [column], [newDirection])

    setSelectedColumn(column)
    setDirection(newDirection)
    setFavouriteList(sortedFavourites)
    setStockList(sortedStocks)
  }
  async function load() {
    let products = props.assetList
    let stock: GQL_AssetList1[] = []

    /* Find faourites */
    var s = await preferences.getString('favoriteList')
    var tempFavList = [] // array of symbols,
    var json = { list: [] as any[] }
    if (s != null && s != undefined && s != '') {
      json = JSON.parse(s)
      tempFavList = json.list
    }
    /* End of Find Favourites */

    let favourite: GQL_AssetList1[] = []
    for (let i = 0; i < products.length; i++) {
      products[i].price = parseFloat(products[i].price as string)
      products[i].dayDiff = parseFloat(products[i].dayDiff as string)
      if (tempFavList.includes(products[i].symbol.toLowerCase())) {
        // If symbol exists in Favourite , then push asset in favourite
        favourite.push(products[i])
      }
      const item = products[i]
      stock.push(item)
    }
    setFavouriteList(favourite)
    setStockList(stock)
  }

  const onRefresh = React.useCallback(() => {
    setRefresh(true)
    load()
      .then(() => {
        setRefresh(false)
      })
      .catch((error) => {
        setRefresh(false)
      })
  }, [isRefresh, stockList])
  const [selectedTab, setTab] = useState(0)
  const [selectedInvestTab, setInvestTab] = useState(0)
  return (
    <View style={{ flex: 1, width: Resources.windowSize().width }}>
      {/* {props.selectedTab == 1 && (
        <CategoryView
          setTab={(index) => {
            setInvestTab(index)
          }}
          selectedTab={selectedInvestTab}
          stockList={stockList}
          navigation={props.navigation}
        />
      )} */}
      {stockList.length > 0 && selectedInvestTab === 1 ? (
        <>
          {/* <SortBar
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
            sortTable={sortTable}
            showPercent={showPercent}
          /> */}
          <Animated.FlatList
            style={{ flex: 1 }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y: props.tab2ScrollY },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
            refreshControl={
              <RefreshControl
                tintColor={'transparent'}
                refreshing={isRefresh}
                onRefresh={onRefresh}
              />
            }
            ListHeaderComponent={() => {
              return (
                <ListHeader
                  setTab={(index) => {
                    setInvestTab(index)
                  }}
                  selectedTab={selectedInvestTab}
                  stockList={stockList}
                  navigation={props.navigation}
                  setInvestTab={setInvestTab}
                  selectedInvestTab={selectedInvestTab}
                  selectedColumn={selectedColumn}
                  setSelectedColumn={setSelectedColumn}
                  sortTable={sortTable}
                  showPercent={showPercent}
                  setShowSearchView={props.setShowSearchView}
                />
              )
            }}
            ListFooterComponent={() => {
              return <View style={{ height: safeInsetBottom + 20 }} />
            }}
            data={stockList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => {
              return (
                <MainTab2ItemView
                  detailPressed={(symbol: string) => {
                    props.navigation.push('InvestedDetail', { symbol: symbol })
                  }}
                  _item={item}
                  setShowPercent={setShowPercent}
                  showPercent={showPercent}
                />
              )
            }}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View />
      )}
      {stockList.length > 0 && selectedInvestTab === 0 ? (
        <>
          {/* <SortBar
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
            sortTable={sortTable}
            showPercent={showPercent}
          /> */}
          <Animated.FlatList
            style={{ flex: 1 }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y: props.tab2ScrollY },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
            refreshControl={
              <RefreshControl
                tintColor={'transparent'}
                refreshing={isRefresh}
                onRefresh={onRefresh}
              />
            }
            ListHeaderComponent={() => {
              return (
                <ListHeader
                  setTab={(index) => {
                    setInvestTab(index)
                  }}
                  selectedTab={selectedInvestTab}
                  stockList={stockList}
                  navigation={props.navigation}
                  setInvestTab={setInvestTab}
                  selectedInvestTab={selectedInvestTab}
                  selectedColumn={selectedColumn}
                  setSelectedColumn={setSelectedColumn}
                  sortTable={sortTable}
                  showPercent={showPercent}
                  setShowSearchView={props.setShowSearchView}
                />
              )
            }}
            ListFooterComponent={() => {
              return <View style={{ height: safeInsetBottom + 20 }} />
            }}
            data={favouriteList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => {
              return (
                <MainTab2ItemView
                  detailPressed={(symbol: string) => {
                    props.navigation.push('InvestedDetail', { symbol: symbol })
                  }}
                  _item={item}
                  setShowPercent={setShowPercent}
                  showPercent={showPercent}
                />
              )
            }}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View />
      )}
    </View>
  )
}

function ListHeader(props: {
  setTab: (t: number) => void
  setInvestTab: (t: number) => void
  selectedInvestTab: number
  selectedTab: number
  stockList: GQL_AssetList1[]
  navigation: any

  setSelectedColumn: (t: string) => void
  sortTable: (t: string) => void
  selectedColumn: string
  showPercent: boolean
  setShowSearchView: (t: boolean) => void
}) {
  const { translations } = useContext(ConfigContext)
  const safeInsetTop = Resources.getSafeLayoutInsets().top
  return (
    <View
      style={
        {
          // marginTop: 500
          // marginTop: 15,
        }
      }
    >
      <CategoryView
        setTab={(index) => {
          props.setInvestTab(index)
        }}
        selectedTab={props.selectedInvestTab}
        stockList={props.stockList}
        navigation={props.navigation}
        setShowSearchView={props.setShowSearchView}
      />
      {/* <SearchBar /> */}
      <View style={{ height: 5 + safeInsetTop }} />
      <View
        style={{
          marginLeft: 24,
          marginRight: 24,
          height: 1,
          backgroundColor: Resources.Colors.dummyup,
        }}
      />
      <View
        style={{
          marginLeft: 24,
          marginRight: 24,
          height: 1,
          backgroundColor: Resources.Colors.dummydown,
        }}
      />
      <SortBar
        selectedColumn={props.selectedColumn}
        setSelectedColumn={props.setSelectedColumn}
        sortTable={props.sortTable}
        showPercent={props.showPercent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  rect: {
    width: '100%',
  },
  topAssets: {
    color: '#fea748',
    marginTop: 8,
    fontSize: 18,
  },
  image: {
    top: 10,
    left: 0,
    width: 15,
    height: 15,
    position: 'absolute',
  },
  imageup: {
    width: 10,
    height: 10,
  },
  imageStack: {
    width: 70,
    height: 31,
  },
  topAssetsRow: {
    height: 31,
    flexDirection: 'row',
    marginTop: 7,
    marginLeft: 20,
    // marginRight: 17,
    justifyContent: 'space-between',
    width: '100%',
  },
  scrollArea: {
    marginLeft: 13,
    marginBottom: 30,
  },
  active: {
    backgroundColor: Resources.Colors.brightTeal,
    color: '#fff',
  },
  rect2: {
    width: 110,
    alignItems: 'center',
    backgroundColor: Resources.Colors.darkGreyTwo,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 10,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 8,
    color: '#fff',
  },
  image3: {
    width: 35,
    height: 34,
  },
  symbol: {
    fontFamily: 'roboto-regular',
    color: '#fff',
    fontSize: 20,
    marginTop: 5,
  },
  companyName: {
    color: Resources.Colors.greyishBrown,
    fontWeight: 'bold',
    fontSize: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    height: 'auto',
    marginBottom: 22,
  },
  rect3: {
    top: 0,
    left: 34,
    width: 26,
    height: 17,
    position: 'absolute',
  },
  changes: {
    // top: 8,
    fontWeight: 'bold',
    color: '#2c2c2e',
    alignItems: 'center',
  },
  rect3Stack: {
    width: 82,
    height: 25,
    fontWeight: 'bold',
    alignItems: 'center',
    position: 'absolute',
    bottom: 2,
    // marginBottom
    // paddingRight: 12,
  },
})

function ImageView(props: { symbol: string }) {
  const [noIcon, setNoIcon] = useState(false)

  return (
    <>
      <Image
        source={{
          uri: `https://mirror.finance/assets/icon/${props.symbol}@3x.png`,
        }}
        resizeMode='contain'
        style={[styles.image3, { display: !noIcon ? 'flex' : 'none' }]}
        onLoadStart={() => {
          setNoIcon(false)
        }}
        onError={(error) => {
          setNoIcon(true)
        }}
      />
      <View
        style={{
          display: noIcon ? 'flex' : 'none',
          width: 35,
          height: 35,
          backgroundColor: Resources.Colors.darkGreyFour,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Text
          style={{
            display: noIcon ? 'flex' : 'none',
            fontFamily: Resources.Fonts.bold,
            fontSize: 10,
            letterSpacing: -0.3,
            color: Resources.Colors.veryLightPinkTwo,
            height: 35,
            lineHeight: 35,
          }}
        >
          {'ETF'}
        </Text>
      </View>
    </>
  )
}
function CategoryView(props: {
  setTab: (t: number) => void
  selectedTab: number
  stockList: GQL_AssetList1[]
  navigation: any
  setShowSearchView: (t: boolean) => void
}) {
  const [active, setActive] = useState(props.stockList[0]?.symbol)
  const [mostActive, setMostActive] = useState(props.stockList)
  // const [position, setPosition] = useState<any>("a");
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)
  useEffect(() => {
    sortTable('dayDiff')
  }, [props.stockList])

  const sortTable = (column: string) => {
    const stockListData = [...props.stockList]

    const newDirection = 'desc'
    const sortedStocks = _.orderBy(stockListData, [column], [newDirection])
    setMostActive(sortedStocks)
    setActive(sortedStocks[0]?.symbol)
  }

  return (
    <>
      <SearchBar setShowSearchView={props.setShowSearchView} />
      <View
        style={{
          marginTop: 80,
          borderLeftColor: '#FEA748',
          backgroundColor: Resources.Colors.darkGreyFour,
          borderLeftWidth: 6,
        }}
      >
        {/* <View style={styles.container}> */}
        <View style={styles.rect}>
          <View style={styles.topAssetsRow}>
            <Text style={styles.topAssets}>Top of the Day Assets</Text>
            <View style={styles.imageStack}>
              <Image
                source={
                  showLeft
                    ? Resources.Images.btnBackW
                    : Resources.Images.btnBackB
                }
                resizeMode='contain'
                style={{ ...styles.image }}
              />
              <Image
                source={
                  showRight
                    ? Resources.Images.btnForwardW
                    : Resources.Images.btnForwardB
                }
                resizeMode='contain'
                style={{ ...styles.image, left: 15 }}
              />
            </View>
          </View>

          <View style={styles.scrollArea}>
            <View style={{}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onScroll={(scroll) => {
                  const {
                    contentOffset,
                    layoutMeasurement,
                    contentSize,
                  } = scroll.nativeEvent
                  if (contentOffset.x < 110) {
                    setShowLeft(false)
                    setShowRight(true)
                  } else if (
                    contentOffset.x >
                    contentSize.width - layoutMeasurement.width - 110
                  ) {
                    setShowLeft(true)
                    setShowRight(false)
                  } else {
                    setShowLeft(true)
                    setShowRight(true)
                  }
                  Animated.event(
                    [
                      {
                        nativeEvent: {
                          contentOffset: { x: new Animated.Value(0) },
                        },
                      },
                    ],
                    { useNativeDriver: true }
                  )
                }}
              >
                <Animated.FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  // onScroll={(scroll) => {
                  //   setPosition(scroll)
                  //   Animated.event([
                  //     {
                  //       nativeEvent: {
                  //         contentOffset: { x: new Animated.Value(0) },
                  //       },
                  //     },
                  //   ])
                  // }}
                  keyExtractor={(item, index) => index.toString()}
                  data={mostActive}
                  renderItem={({ item }) => {
                    const dayDiffRate = new BigNumber(item.dayDiff)
                    const color =
                      item.dayDiff < 0
                        ? Resources.Colors.brightPink
                        : item.dayDiff > 0
                        ? Resources.Colors.brightTeal
                        : Resources.Colors.white
                    return (
                      <View
                        onTouchEnd={() => {
                          setActive(item.symbol)
                          props.navigation.push('InvestedDetail', {
                            symbol: item.symbol,
                          })
                        }}
                        style={[
                          styles.rect2,
                          active === item.symbol ? styles.active : [],
                        ]}
                      >
                        <ImageView symbol={item.symbol} />
                        <Text
                          style={[
                            styles.symbol,
                            active === item.symbol
                              ? { color: Resources.Colors.darkGrey }
                              : [],
                          ]}
                        >
                          {item.symbol}
                        </Text>
                        <Text
                          style={[
                            styles.companyName,
                            active === item.symbol
                              ? { color: Resources.Colors.darkGrey }
                              : [],
                          ]}
                        >
                          {item.name}
                        </Text>
                        <View style={styles.rect3Stack}>
                          <Text
                            style={[
                              styles.changes,
                              active !== item.symbol ? { color } : [],
                            ]}
                          >
                            {' '}
                            <Image
                              source={
                                active === item.symbol
                                  ? item.dayDiff > 0
                                    ? Resources.Images.iconIncreaseB
                                    : Resources.Images.iconDecreaseB
                                  : item.dayDiff > 0
                                  ? Resources.Images.iconIncrease
                                  : Resources.Images.iconDecrease
                              }
                              resizeMode='contain'
                              style={styles.imageup}
                            />{' '}
                            {Utils.getFormatted(
                              dayDiffRate.multipliedBy(100).abs(),
                              1,
                              true
                            ) + '%'}
                          </Text>
                        </View>
                      </View>
                    )
                  }}
                />
              </ScrollView>
            </View>
          </View>
        </View>
        {/* </View> */}
      </View>
      <View
        style={{
          width: '100%',
          // flex: 1,
          marginTop: 10,
          // marginBottom: -100,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {props.selectedTab == 0 ? (
          <View
            style={{
              marginLeft: 24,
              marginRight: 24,
              flex: 1,
              height: 44,
              borderRadius: 22,
              backgroundColor: Resources.Colors.darkGreyFour,
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 2,
                bottom: 2,
                left: 2,
                width: Resources.windowSize().width / 2 - 26,
                height: 40,
                borderRadius: 20,
                backgroundColor: Resources.Colors.darkBackground,
                borderWidth: 1,
                borderColor: Resources.Colors.darkGreyTwo,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: Resources.Colors.brightTeal,
                  fontFamily: Resources.Fonts.medium,
                  fontSize: 12,
                  letterSpacing: -0.3,
                }}
              >
                {'Favorites'}
              </Text>
            </View>
            <ThrottleButton
              type='RectButton'
              style={{
                position: 'absolute',
                top: 2,
                bottom: 2,
                right: 2,
                width: Resources.windowSize().width / 2 - 26,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                props.setTab(1)
              }}
            >
              <Text
                style={{
                  color: Resources.Colors.brightTeal,
                  fontFamily: Resources.Fonts.medium,
                  fontSize: 12,
                  letterSpacing: -0.3,
                }}
              >
                {'Mirror Assets'}
              </Text>
            </ThrottleButton>
          </View>
        ) : (
          <View
            style={{
              marginLeft: 24,
              marginRight: 24,
              flex: 1,
              height: 44,
              borderRadius: 22,
              backgroundColor: Resources.Colors.darkGreyFour,
            }}
          >
            <ThrottleButton
              type='RectButton'
              style={{
                position: 'absolute',
                top: 2,
                bottom: 2,
                left: 2,
                width: Resources.windowSize().width / 2 - 26,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                props.setTab(0)
              }}
            >
              <Text
                style={{
                  color: Resources.Colors.brightTeal,
                  fontFamily: Resources.Fonts.medium,
                  fontSize: 12,
                  letterSpacing: -0.3,
                }}
              >
                {'Favorites'}
              </Text>
            </ThrottleButton>

            <View
              style={{
                position: 'absolute',
                top: 2,
                bottom: 2,
                right: 2,
                width: Resources.windowSize().width / 2 - 26,
                height: 40,
                borderRadius: 20,
                backgroundColor: Resources.Colors.darkBackground,
                borderWidth: 1,
                borderColor: Resources.Colors.darkGreyTwo,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: Resources.Colors.brightTeal,
                  fontFamily: Resources.Fonts.medium,
                  fontSize: 12,
                  letterSpacing: -0.3,
                }}
              >
                {'Mirror Assets'}
              </Text>
            </View>
          </View>
        )}
      </View>
    </>
  )
}

function SortBar(props: {
  setSelectedColumn: (t: string) => void
  sortTable: (t: string) => void
  selectedColumn: string
  showPercent: boolean
}) {
  return (
    <View
      style={{
        width: '100%',
        // flex: 1,
        marginTop: 5,
        // marginBottom: -100,
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
      }}
    >
      <View
        style={{
          marginLeft: 24,
          marginRight: 24,
          flex: 1,
          height: 44,
          // borderRadius: 22,
          // backgroundColor: Resources.Colors.darkGreyFour,
        }}
      >
        <View
          style={{
            // position: 'absolute',
            top: 2,
            bottom: 2,
            left: 2,
            width: Resources.windowSize().width / 2 - 26,
            height: 40,
            // borderRadius: 20,
            backgroundColor: Resources.Colors.darkBackground,
            // borderWidth: 1,
            // borderColor: Resources.Colors.darkGreyTwo,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onTouchStart={() => props.sortTable('symbol')}
        >
          <Text
            style={{
              color: Resources.Colors.greyishBrown,
              fontFamily: Resources.Fonts.medium,
              fontSize: 16,
              letterSpacing: -0.3,
            }}
          >
            {'Assets'}
          </Text>
          <View
            style={{
              marginLeft: 35,
              top: 16,
              position: 'absolute',
              width: 10,
              height: 10,
            }}
          >
            <Image
              source={Resources.Images.iconSort2x}
              resizeMode='contain'
              style={{ height: 11, width: 11, marginLeft: 30 }}
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 2,
            bottom: 2,
            right: 2,
            width: Resources.windowSize().width / 2 - 52,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onTouchStart={() =>
            props.sortTable(props.showPercent ? 'dayDiff' : 'price')
          }
        >
          <Text
            style={{
              color: Resources.Colors.greyishBrown,
              fontFamily: Resources.Fonts.medium,
              fontSize: 16,
              letterSpacing: -0.3,
            }}
          >
            {'Value'}
          </Text>
          <View
            style={{
              marginLeft: 35,
              top: 16,
              position: 'absolute',
              width: 10,
              height: 10,
            }}
          >
            <Image
              source={Resources.Images.iconSort2x}
              resizeMode='contain'
              style={{ height: 11, width: 11, marginLeft: 30 }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
