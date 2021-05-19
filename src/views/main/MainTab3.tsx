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
import SearchBar from './SearchBar'

const preferences = NativeModules.RnPreferences

export function MainTab3(props: {
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
      if (props.selectedTab == 2) {
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
      <SearchBar setShowSearchView={props.setShowSearchView} />
      {/*  */}
      <Animated.FlatList
        style={{ flex: 1, marginTop: 80 }}
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
        // refreshControl={
        //   <RefreshControl
        //     tintColor={'transparent'}
        //     refreshing={isRefresh}
        //     onRefresh={onRefresh}
        //   />
        // }
        // // ListHeaderComponent={() => {
        //   return (
        //     <ListHeader
        //       setTab={(index) => {
        //         setInvestTab(index)
        //       }}
        //       selectedTab={selectedInvestTab}
        //       stockList={stockList}
        //       navigation={props.navigation}
        //       setInvestTab={setInvestTab}
        //       selectedInvestTab={selectedInvestTab}
        //     />
        //   )
        // }}
        // ListFooterComponent={() => {
        //   return <View style={{ height: safeInsetBottom + 20 }} />
        // }}
        data={stockList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => {
          return (
            <View
              style={{
                borderTopWidth: 1,
                // borderColor: Resources.Colors.darkGreyTwo,
              }}
            >
              <View style={styles.listWrapper}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View style={styles.containOne}>
                    <View style={styles.Imgwrapper}>
                      <Image
                        source={Resources.Images.iconSort2x}
                        resizeMode='contain'
                        style={{
                          width: 20,
                          height: 20,
                          padding: 5,
                        }}
                      />
                    </View>
                    <View style={styles.Imgwrapperol}>
                      <Image
                        source={Resources.Images.iconSort2x}
                        resizeMode='contain'
                        style={{
                          width: 20,
                          height: 20,
                          padding: 5,
                        }}
                      />
                    </View>
                  </View>
                  <Text style={styles.textTitle}>MIR-UST LP</Text>
                </View>
                <View
                  style={{ borderLeftColor: '#49494938', borderLeftWidth: 0.2 }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      paddingLeft: 22,
                      paddingBottom: 8,
                      paddingTop: 8,
                      paddingRight: 22,
                    }}
                  >
                    <Text style={styles.texOne}>APR</Text>
                    <Text style={styles.textTwe}>104.71%</Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      paddingLeft: 22,
                      paddingBottom: 8,
                      paddingTop: 8,
                      paddingRight: 22,
                      borderTopColor: '#49494938',
                      borderTopWidth: 0.2,
                    }}
                  >
                    <Text style={styles.texOne}>Total Staked</Text>
                    <Text style={styles.textTwe}>80.06M</Text>
                  </View>
                </View>
              </View>
            </View>
          )
        }}
        showsVerticalScrollIndicator={false}
      />
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
}) {
  const { translations } = useContext(ConfigContext)
  const safeInsetTop = Resources.getSafeLayoutInsets().top
  return <Text>UJJAL</Text>
}

const styles = StyleSheet.create({
  listWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 10,
  },
  containOne: {
    position: 'relative',
    width: 70,
    height: 46,
  },
  Imgwrapper: {
    position: 'absolute',
    zIndex: 2,
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#f89919',
    alignItems: 'center',
  },
  Imgwrapperol: {
    position: 'absolute',
    zIndex: -1,
    right: 0,
    left: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#2c2c2e',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: '13%',
  },
  texOne: {
    fontSize: 11,
    color: '#525252',
  },
  textTwe: {
    fontSize: 18,
    color: '#48e1c5',
    fontWeight: 'bold',
  },
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
    height: 30,
  },
  rect3: {
    top: 0,
    left: 34,
    width: 26,
    height: 17,
    position: 'absolute',
  },
  changes: {
    top: 8,
    fontWeight: 'bold',
    color: '#2c2c2e',
    alignItems: 'center',
  },
  rect3Stack: {
    width: 82,
    height: 25,
    fontWeight: 'bold',
    alignItems: 'center',
    // paddingRight: 12,
  },
})

// function ImageView(props: { symbol: string }) {
//   const [noIcon, setNoIcon] = useState(false)

//   return (
//     <>
//       <Text>ujjal</Text>
//     </>
//   )
// }

// function SortBar(props: {
//   setSelectedColumn: (t: string) => void
//   sortTable: (t: string) => void
//   selectedColumn: string
//   showPercent: boolean
// }) {
//   return <Text>ujjal</Text>
// }
