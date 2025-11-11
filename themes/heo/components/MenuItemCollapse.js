import Collapse from '@/components/Collapse'
import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

/**
 * 折叠菜单
 * @param {*} param0
 * @returns
 */
export const MenuItemCollapse = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  const [isOpen, changeIsOpen] = useState(false)

  const toggleShow = () => {
    changeShow(!show)
  }

  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen)
  }

  if (!link || !link.show) {
    return null
  }

  return (
    <>
      <div
        className='select-none w-full p-2 border dark:border-gray-600 rounded-lg text-left dark:bg-[#1e1e1e]'
        onClick={toggleShow}>
        {!hasSubMenu && (
          <SmartLink
            href={link?.href}
            target={link?.target}
            className='font-bold font-sans flex justify-between pl-2 pr-4 dark:text-gray-200 no-underline tracking-widest'>
            <span className='transition-all items-center duration-200'>
              {link?.name}
            </span>
          </SmartLink>
        )}
        {hasSubMenu && (
          <div
            onClick={hasSubMenu ? toggleOpenSubMenu : null}
            className='font-bold font-sans flex items-center justify-between pl-2 pr-4 cursor-pointer dark:text-gray-200 no-underline tracking-widest'>
            <span className='transition-all items-center duration-200'>
              {link?.name}
            </span>
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>

      {/* 折叠子菜单 */}
      {hasSubMenu && (
        <Collapse isOpen={isOpen} className='rounded-xl'>
          {link.subMenus.map((sLink, index) => {
            return (
              <div
                key={index}
                className='dark:bg-hexo-black-gray dark:text-gray-200 text-left px-3 justify-start bg-gray-50 hover:bg-gray-50 dark:hover:bg-gray-900 tracking-widest transition-all duration-200 py-3 pr-6'>
                <SmartLink href={sLink.href} target={link?.target}>
                  <span className='text-sm ml-4 whitespace-nowrap font-medium'>
                    {sLink.title}
                  </span>
                </SmartLink>
              </div>
            )
          })}
        </Collapse>
      )}
    </>
  )
}
