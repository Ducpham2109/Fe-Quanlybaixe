import { Input, Spin } from "antd"

import { memo, useState } from "react"

const { Search } = Input
const SearchParking = () =>{
  const [isLoading, setIsLoading] = useState(false)
  const handleSearchAccount = (value) => {
    setIsLoading(true)
}
    return(
        <>
        <Spin size="large" spinning={isLoading}>
        <Search
          placeholder="Search"
          onSearch={handleSearchAccount}
          style={{
            width: 170
          }}
        />
      </Spin>
        </>
    )
}
export default memo(SearchParking)