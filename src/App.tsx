import VList from "./VList"

function App() {
  const list = Array(10000).fill(0).map((_, index) => ({ id: index }))

  return (
    <div>
      <VList list={list} />
    </div>
  )
}

export default App
