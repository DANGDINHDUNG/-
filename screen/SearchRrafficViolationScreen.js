import * as React from 'react';
import { WebView } from 'react-native-webview';
import style from "../style/Style";

const SearchTrafficScreen =()=> {
    return (
      <WebView
        style={style.container}
        source={{ uri: 'https://www.csgt.vn/tra-cuu-phuong-tien-vi-pham.html' }}
      />
    );
}

export default SearchTrafficScreen;