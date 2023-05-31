import React, { useEffect, useRef } from 'react'
import {
  StatusBar,
  Text,
  useColorScheme,
  View,
  ScrollView,
} from 'react-native'

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen'

// import { useSingleState, useSingleInstanceVar } from 'react-native-orzhtml-usecom'
import { useSingleState, useSingleInstanceVar, useStateCB, useLatest } from './app/libs/react-native-orzhtml-usecom'

type ItemsType = {
  channel_id: string,
  source_id: string,
  source: string,
  source_remarks: string,
  source_introduce: string,
  channel: string,
  channel_name: string,
  type: string,
  logo: string,
  icon: string,
  status: string,
  money: string,
  video: string,
  illustrate: string,
  showType: string,
  rss_num: string,
  time: string,
  is_new: string,
  color: string,
}

const App = () => {
  const [state, setState] = useSingleState<{
    name: string,
    num: number,
    list: ItemsType[],
  }>({
    name: '1',
    num: 10,
    list: [],
  })
  const inst = useSingleInstanceVar({
    status: true,
  })
  const instVar = useLatest(1111)
  const aa = useRef(0)
  // const [name, setName] = useStateCB<any>('name')
  const [num, setNum] = useStateCB<{a: number, b: string, list: ItemsType[], }>({ a: 100, b: '123', list: [] })
  // const [list, setList] = useStateCB([])

  useEffect(() => {
    console.log('useEffect init')
    aa.current = aa.current + 1
    let _listArr = [
      {
        channel_id: '334',
        source_id: '536',
        source: '智族GQ',
        source_remarks: '在中国出版的《智族GQ》也会必将成为对生活有追求的中国精英男性的终极阅读良伴',
        source_introduce: '在中国出版的《智族GQ》也会必将成为对生活有追求的中国精英男性的终极阅读良伴',
        channel: 'zhizu_yuekan',
        channel_name: '月刊',
        type: 'ent',
        logo: 'https://kavt.oss-cn-shanghai.aliyuncs.com/applogo/new.png',
        icon: 'https://bzlogo.s3.ap-east-1.amazonaws.com/LOGO/go.jpg',
        status: '0',
        money: '1',
        video: '0',
        illustrate: '0',
        showType: '0',
        rss_num: '783',
        time: '1660877043',
        is_new: '1',
        color: '#7759ff',
      },
      {
        channel_id: '333',
        source_id: '534',
        source: '女友',
        source_remarks: '女友传媒集团于1988年成立，同年创办《女友》杂志。历经三十多年发展，其品牌影响和传媒理念深刻影响着广大中国女性的思想认知和价值观。',
        source_introduce: '女友传媒集团于1988年成立，同年创办《女友》杂志。历经三十多年发展，其品牌影响和传媒理念深刻影响着广大中国女性的思想认知和价值观。',
        channel: 'nvyou_yuekan',
        channel_name: '月刊',
        type: 'ent',
        logo: 'https://kavt.oss-cn-shanghai.aliyuncs.com/applogo/new.png',
        icon: 'https://bzlogo.s3.ap-east-1.amazonaws.com/LOGO/nvyou.jpg',
        status: '0',
        money: '1',
        video: '0',
        illustrate: '0',
        showType: '0',
        rss_num: '227',
        time: '1660658736',
        is_new: '1',
        color: '#FB0E5F',
      },
      {
        channel_id: '332',
        source_id: '532',
        source: '海外文摘',
        source_remarks: '专门介绍国外以及台湾、香港、澳门的社会万象和风土人情，以传播知识、开阔眼界、陶冶情操为宗旨。',
        source_introduce: '专门介绍国外以及台湾、香港、澳门的社会万象和风土人情，以传播知识、开阔眼界、陶冶情操为宗旨。',
        channel: 'hwwz_yuekan',
        channel_name: '月刊',
        type: 'world',
        logo: 'https://kavt.oss-cn-shanghai.aliyuncs.com/applogo/new.png',
        icon: 'https://bzlogo.s3.ap-east-1.amazonaws.com/LOGO/hwwz.jpg',
        status: '0',
        money: '1',
        video: '0',
        illustrate: '0',
        showType: '0',
        rss_num: '900',
        time: '1660358836',
        is_new: '1',
        color: '#ffde00',
      },
      {
        channel_id: '331',
        source_id: '528',
        source: '悦游',
        source_remarks: '《悦游Traveler》是康泰纳仕集团旗下的高端旅游杂志《CondéNastTraveler》中国版',
        source_introduce: '《悦游Traveler》是康泰纳仕集团旗下的高端旅游杂志《CondéNastTraveler》中国版',
        channel: 'yueyou_yuekan',
        channel_name: '月刊',
        type: 'env',
        logo: 'https://kavt.oss-cn-shanghai.aliyuncs.com/applogo/new.png',
        icon: 'https://bzlogo.s3.ap-east-1.amazonaws.com/LOGO/yueyou.jpg',
        status: '0',
        money: '1',
        video: '0',
        illustrate: '0',
        showType: '0',
        rss_num: '2806',
        time: '1660357353',
        is_new: '1',
        color: '#00AB5D',
      },
      {
        channel_id: '330',
        source_id: '526',
        source: '读书',
        source_remarks: '《读书》关注书里书外的人和事，探讨大书小书涉及的社会文化问题，推介不同知识领域的独立思考，展示各种声音的复杂性和多样性，向以引领思潮为己任。是中国三十年来思想文化变迁的见证者。',
        source_introduce: '《读书》关注书里书外的人和事，探讨大书小书涉及的社会文化问题，推介不同知识领域的独立思考，展示各种声音的复杂性和多样性，向以引领思潮为己任。是中国三十年来思想文化变迁的见证者。',
        channel: 'dushu_yuekan',
        channel_name: '月刊',
        type: 'life',
        logo: 'https://kavt.oss-cn-shanghai.aliyuncs.com/applogo/new.png',
        icon: 'https://bzlogo.s3.ap-east-1.amazonaws.com/LOGO/dushu.jpg',
        status: '0',
        money: '1',
        video: '0',
        illustrate: '0',
        showType: '0',
        rss_num: '342',
        time: '1660267033',
        is_new: '1',
        color: '#6e7780',
      },
      {
        channel_id: '328',
        source_id: '524',
        source: '摄影之友',
        source_remarks: '《摄影之友》是广东省摄影家协会出版的杂志，主要通过Web、SNS、APP和杂志为用户提供专业、权威、时尚、实用的优质内容。  ',
        source_introduce: '《摄影之友》是广东省摄影家协会出版的杂志，主要通过Web、SNS、APP和杂志为用户提供专业、权威、时尚、实用的优质内容。  ',
        channel: 'syzy_yuekan',
        channel_name: '月刊',
        type: 'ent',
        logo: 'https://kavt.oss-cn-shanghai.aliyuncs.com/applogo/new.png',
        icon: 'https://bzlogo.s3.ap-east-1.amazonaws.com/LOGO/syzy.png',
        status: '0',
        money: '1',
        video: '0',
        illustrate: '0',
        showType: '0',
        rss_num: '5070',
        time: '1660096753',
        is_new: '1',
        color: '#ff0080',
      },
      {
        channel_id: '327',
        source_id: '522',
        source: '时尚北京',
        source_remarks: '《时尚北京》杂志是代表北京都市时尚的权威刊物。',
        source_introduce: '《时尚北京》杂志是代表北京都市时尚的权威刊物。',
        channel: 'ssbj_yuekan',
        channel_name: '月刊',
        type: 'ent',
        logo: 'https://kavt.oss-cn-shanghai.aliyuncs.com/applogo/new.png',
        icon: 'https://bzlogo.s3.ap-east-1.amazonaws.com/LOGO/ssbj.jpg',
        status: '0',
        money: '1',
        video: '0',
        illustrate: '0',
        showType: '0',
        rss_num: '11019',
        time: '1660037232',
        is_new: '1',
        color: '#ffd333',
      },
      {
        channel_id: '326',
        source_id: '518',
        source: '科学之友',
        source_remarks: '《科学之友》创刊于1980年，办刊宗旨为：弘扬科学精神，普及科学知识，倡导大众理解科学',
        source_introduce: '《科学之友》创刊于1980年，办刊宗旨为：弘扬科学精神，普及科学知识，倡导大众理解科学',
        channel: 'kxzy_yuekan',
        channel_name: '月刊',
        type: 'it',
        logo: 'https://kavt.oss-cn-shanghai.aliyuncs.com/applogo/new.png',
        icon: 'https://bzlogo.s3.ap-east-1.amazonaws.com/LOGO/kxzy.jpg',
        status: '0',
        money: '1',
        video: '0',
        illustrate: '0',
        showType: '0',
        rss_num: '9243',
        time: '1659944919',
        is_new: '1',
        color: '#000',
      },
      {
        channel_id: '325',
        source_id: '516',
        source: '百科知识',
        source_remarks: '《百科知识》杂志社与中国大百科全书出版社同期创建于1979年，是由中国大百科全书出版社主办的文理合编的国家级科普刊物，是国内公认的老牌科普杂志之一。',
        source_introduce: '《百科知识》杂志社与中国大百科全书出版社同期创建于1979年，是由中国大百科全书出版社主办的文理合编的国家级科普刊物，是国内公认的老牌科普杂志之一。',
        channel: 'baike_zhoukan',
        channel_name: '双周刊',
        type: 'it',
        logo: 'https://kavt.oss-cn-shanghai.aliyuncs.com/applogo/new.png',
        icon: 'https://bzlogo.s3.ap-east-1.amazonaws.com/LOGO/bkzs.jpg',
        status: '0',
        money: '1',
        video: '0',
        illustrate: '0',
        showType: '0',
        rss_num: '3342',
        time: '1659942477',
        is_new: '1',
        color: '#232a31',
      },
      {
        channel_id: '324',
        source_id: '514',
        source: '电脑爱好者',
        source_remarks: '秉承浅显易懂、通俗流畅的风格，面对越来越多的初中级电脑爱好者，传播电脑知识，培养电脑人才，其内容广泛涉猎软件、硬件、市场、评测、网络、游戏、编程等多方面',
        source_introduce: '秉承浅显易懂、通俗流畅的风格，面对越来越多的初中级电脑爱好者，传播电脑知识，培养电脑人才，其内容广泛涉猎软件、硬件、市场、评测、网络、游戏、编程等多方面',
        channel: 'dnahz_zhoukan',
        channel_name: '双周刊',
        type: 'it',
        logo: 'https://kavt.oss-cn-shanghai.aliyuncs.com/applogo/new.png',
        icon: 'https://bzlogo.s3.ap-east-1.amazonaws.com/LOGO/dnahz.jpg',
        status: '0',
        money: '1',
        video: '0',
        illustrate: '0',
        showType: '0',
        rss_num: '352',
        time: '1659941415',
        is_new: '1',
        color: '#5b636a',
      },
    ]
    setTimeout(() => {
      // setList(_listArr)
      setState({
        name: '小明小明',
        // num: 30300,
        list: _listArr,
      }, () => {
        setState({
          num: 4000,
          name: '1---',
        })
      })
      console.log('useEffect init 2:', state.list[0].color)
      aa.current = aa.current + 1
    }, 3000)
    console.log('num:', num().a)
    setNum({ a: 11111 })
    console.log('num2:', num().b)
  }, [])

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  console.log('list:111', aa.current, state.list, inst.status, instVar.current)

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={{
        flex: 1,
        paddingTop: 100,
      }}>
        <View style={{
          flexDirection: 'column',
        }}>
          <Text style={{ color: '#333' }}>测试 demo</Text>
          <Text style={{ color: '#333' }}>{state.name}</Text>
          <Text style={{ color: '#333' }}>{state.num}</Text>
          {
            state.list.map((item, index) => {
              return (
                <Text key={index}>{item.source}</Text>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default App
