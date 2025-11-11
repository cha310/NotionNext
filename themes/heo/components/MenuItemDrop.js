import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  if (!link || !link.show) {
    return null
  }

  return (
    <div
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {/* 不含子菜单 */}
      {!hasSubMenu && (
        <SmartLink
          target={link?.target}
          href={link?.href}
          className='hover:bg-black hover:bg-opacity-10 rounded-2xl flex justify-center items-center px-3 py-1 no-underline tracking-widest font-bold font-sans'>
          {link?.name}
        </SmartLink>
      )}
      {/* 含子菜单的按钮 */}
      {hasSubMenu && (
        <>
          <div className='cursor-pointer hover:bg-black hover:bg-opacity-10 rounded-2xl flex justify-center items-center gap-2 px-3 py-1 no-underline tracking-widest font-bold font-sans relative'>
            <span>{link?.name}</span>
            <svg 
              className={`w-3 h-3 transition-transform duration-300 ${show ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
            {/* 主菜单下方的安全区域 */}
            {show && (
              <div className='absolute w-full h-4 -bottom-4 left-0 bg-transparent z-30'></div>
            )}
          </div>
        </>
      )}
      {/* 子菜单 */}
      {hasSubMenu && (
        <ul
          style={{ backdropFilter: 'blur(3px)' }}
          className={`${show ? 'visible opacity-100 top-14 pointer-events-auto' : 'invisible opacity-0 top-20 pointer-events-none'} drop-shadow-md overflow-hidden rounded-xl bg-white dark:bg-[#1e1e1e] transition-all duration-300 z-20 absolute min-w-[160px]`}>
          {link.subMenus.map((sLink, index) => {
            return (
              <li
                key={index}
                className='cursor-pointer hover:bg-blue-600 dark:hover:bg-yellow-600 hover:text-white text-gray-900 dark:text-gray-100 tracking-widest transition-all duration-200 py-2 px-4'>
                <SmartLink href={sLink.href} target={link?.target}>
                  <span className='text-sm text-nowrap font-medium'>
                    {sLink.title}
                  </span>
                </SmartLink>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
