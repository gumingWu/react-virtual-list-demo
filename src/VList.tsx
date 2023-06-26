import { useRef, useState, useMemo } from "react"
import './VList.css'

export default function VList(props: { list?: {id: number}[] }) {
  const { list = [] } = props

  const viewport = useRef(null) // 可视区域
  const listArea = useRef(null) // 渲染区域
  const phantom = useRef(null)  // 占位区域，列表总高度

  
  const itemSize = 100 // 每项列表高度
  const phantomHeight = list.length * itemSize // 列表总高度
  const viewCount = 10 // 渲染数量
  const [startIndex, setStartIndex] = useState(0) // 开始索引
  const endIndex = useMemo(() => startIndex + viewCount, [startIndex])
  const [startOffset, setStartOffset] = useState(0) // 偏移量

  // 获取startIndex
  const getStartIndex = (scrollTop) => {
    return Math.floor(scrollTop / itemSize)
  }

  // 获取startOffset
  const getStartOffset = (startIndex) => {
    return startIndex + itemSize
  }

  // 是否在显示范围内
  const isBetweenViewRanges = (index) => {
    return index >= startIndex && index <= endIndex
  }

  // 获取滚动距离
  const onScroll = () => {
    const scrollTop = viewport.current.scrollTop
    const startIndex = getStartIndex(scrollTop)
    setStartIndex(startIndex)

    const startOffset = getStartOffset(scrollTop)
    setStartOffset(startOffset)
  }

  return (
    <div className="viewport" ref={viewport} onScroll={onScroll}>
      <div className="list-phantom" ref={phantom} style={{ height: `${phantomHeight}px` }}></div>
      <div className="list-data" ref={listArea} style={{ transform: `translate3d(0, ${startOffset}px, 0)` }}>
        {list.map(
          (item, index) => 
            isBetweenViewRanges(index) && (
              <div
                key={item.id}
                className="list-item"
                style={{
                  height: `${itemSize}px`,
                  lineHeight: `${itemSize}px`
                }}
              >{item.id}</div>
            )
        )}
      </div>
    </div>
  )
}
