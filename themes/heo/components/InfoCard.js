import { ArrowRightCircle } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import CONFIG from '../config'
import Announcement from './Announcement'
import Card from './Card'

/**
 * 社交信息卡
 * @param {*} props
 * @returns
 */
export function InfoCard(props) {
  const { siteInfo, notice } = props
  const router = useRouter()
  // 在文章详情页特殊处理
  const isSlugPage = router.pathname.indexOf('/[prefix]') === 0
  const url1 = siteConfig('HEO_INFO_CARD_URL1', null, CONFIG)
  const icon1 = siteConfig('HEO_INFO_CARD_ICON1', null, CONFIG)
  const url2 = siteConfig('HEO_INFO_CARD_URL2', null, CONFIG)
  const icon2 = siteConfig('HEO_INFO_CARD_ICON2', null, CONFIG)
  const qrcode2 = siteConfig('HEO_INFO_CARD_ICON2_QRCODE', null, CONFIG)
  const [showQrCode, setShowQrCode] = useState(false)
  const iconRef = useRef(null)
  const [qrPosition, setQrPosition] = useState({ top: 0, left: 0 })

  // 更新二维码弹窗位置
  useEffect(() => {
    if (showQrCode && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect()
      setQrPosition({
        top: rect.top - 220, // 弹窗高度约210px + 间距10px
        left: rect.left + rect.width / 2
      })
    }
  }, [showQrCode])
  return (
    <Card className='wow fadeInUp bg-[#4f65f0] dark:bg-blue-600 text-white flex flex-col w-72 overflow-hidden relative'>
      {/* 信息卡牌第一行 */}
      <div className='flex justify-between'>
        {/* 问候语 */}
        <GreetingsWords />
        {/* 头像 */}
        <div
          className={`${isSlugPage ? 'absolute right-0 -mt-8 -mr-6 hover:opacity-0 hover:scale-150 blur' : 'cursor-pointer'} justify-center items-center flex dark:text-gray-100 transform transitaion-all duration-200`}>
          <LazyImage
            src={siteInfo?.icon}
            className='rounded-full'
            width={isSlugPage ? 100 : 28}
            alt={siteConfig('AUTHOR')}
          />
        </div>
      </div>

      <h2 className='text-3xl font-extrabold mt-3'>{siteConfig('AUTHOR')}</h2>

      {/* 公告栏 */}
      <Announcement post={notice} style={{ color: 'white !important' }} />

      <div className='flex justify-between'>
        <div className='flex space-x-3  hover:text-black dark:hover:text-white'>
          {/* 两个社交按钮 */}
          {url1 && (
            <div className='w-10 text-center bg-indigo-400 p-2 rounded-full  transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-black hover:bg-white'>
              <SmartLink href={url1}>
                {icon1?.startsWith('/') || icon1?.startsWith('http') ? (
                  <img src={icon1} className='w-5 h-5' alt='' />
                ) : (
                  <i className={icon1} />
                )}
              </SmartLink>
            </div>
          )}
          {url2 && (
            <>
              <div 
                ref={iconRef}
                className='relative bg-indigo-400 p-2 rounded-full w-10 items-center flex justify-center transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-black hover:bg-white'
                onMouseEnter={() => qrcode2 && setShowQrCode(true)}
                onMouseLeave={() => setShowQrCode(false)}>
                <SmartLink href={url2}>
                  {icon2?.startsWith('/') || icon2?.startsWith('http') ? (
                    <img src={icon2} className='w-5 h-5' alt='' />
                  ) : (
                    <i className={icon2} />
                  )}
                </SmartLink>
              </div>
              {/* 悬停显示二维码 - 使用 Portal 渲染到 body */}
              {qrcode2 && showQrCode && typeof window !== 'undefined' && (
                <QrCodePopup 
                  qrcode={qrcode2} 
                  position={qrPosition}
                  onMouseEnter={() => setShowQrCode(true)}
                  onMouseLeave={() => setShowQrCode(false)}
                />
              )}
            </>
          )}
        </div>
        {/* 第三个按钮 */}
        <MoreButton />
      </div>
    </Card>
  )
}

/**
 * 了解更多按鈕
 * @returns
 */
function MoreButton() {
  const url3 = siteConfig('HEO_INFO_CARD_URL3', null, CONFIG)
  const text3 = siteConfig('HEO_INFO_CARD_TEXT3', null, CONFIG)
  if (!url3) {
    return <></>
  }
  return (
    <SmartLink href={url3}>
      <div
        className={
          'group bg-indigo-400 dark:bg-blue-500 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white flex items-center transition-colors duration-200 py-2 px-3 rounded-full space-x-1'
        }>
        <ArrowRightCircle
          className={
            'group-hover:stroke-black dark:group-hover:stroke-white w-6 h-6 transition-all duration-100'
          }
        />
        <div className='font-bold'>{text3}</div>
      </div>
    </SmartLink>
  )
}

/**
 * 二维码弹窗组件
 */
function QrCodePopup({ qrcode, position, onMouseEnter, onMouseLeave }) {
  return (
    <div 
      className='fixed z-[9999] transition-all duration-200'
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px`,
        transform: 'translateX(-50%)'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div className='bg-white dark:bg-gray-800 p-3 rounded-xl shadow-2xl border-2 border-indigo-400 dark:border-blue-500'>
        <img src={qrcode} className='w-44 h-44 object-contain' alt='二维码' />
        <div className='text-sm text-center mt-2 text-gray-700 dark:text-gray-200 font-medium'>我的微信</div>
      </div>
      {/* 小三角箭头 */}
      <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800'></div>
    </div>
  )
}

/**
 * 欢迎语
 */
function GreetingsWords() {
  const greetings = siteConfig('HEO_INFOCARD_GREETINGS', null, CONFIG)
  const [greeting, setGreeting] = useState(greetings[0])
  // 每次点击，随机获取greetings中的一个
  const handleChangeGreeting = () => {
    const randomIndex = Math.floor(Math.random() * greetings.length)
    setGreeting(greetings[randomIndex])
  }

  return (
    <div
      onClick={handleChangeGreeting}
      className=' select-none cursor-pointer py-1 px-2 bg-indigo-400 hover:bg-indigo-50  hover:text-indigo-950 dark:bg-blue-500 dark:hover:text-white dark:hover:bg-black text-sm rounded-lg  duration-200 transition-colors'>
      {greeting}
    </div>
  )
}
