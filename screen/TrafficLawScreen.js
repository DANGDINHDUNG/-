import { View, Text, ScrollView, Linking, TouchableOpacity} from "react-native"
import * as React from 'react';
import { useState, useContext } from "react";

import style from "../style/Style";
import themeContext from "../config/themeContext";

const TrafficScreen = ()=>{
    const theme = useContext(themeContext);
    const urlCircular1 = 'http://vbpl.vn/bogiaothong/Pages/ivbpq-toanvan.aspx?ItemID=138236';
    const urlCircular2 = 'http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=140152';
    return(
        <View style={{backgroundColor:theme.backgroundFlatlist}}>
            <ScrollView>
                <View style={{marginLeft: 10, marginRight: 10}}>
                    <Text style={[style.textTrafficTitle, {color:theme.textColor}]}>I. Tốc độ và khoảng cách an toàn</Text>
                    <Text style={[style.textTrafficItali, {color:theme.textColor}]}>Trích {" "}
                        <Text style={[style.textTrafficItali, style.Hyperlink, {marginTop: 0}]}
                            onPress={() => {
                            Linking.openURL(urlCircular1);
                            }}>
                            Thông tư 31/2019/TT-BGTVT
                        </Text>
                    , có hiệu lực kể từ ngày 15/10/2019.</Text>
                    <Text style={[style.textTrafficTerm, {color:theme.textColor}]}>Điều 6. Tốc độ tối đa cho phép xe cơ giới tham gia giao thông trong khu vực đông dân cư (trừ đường cao tốc)</Text>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 200, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, height: 200, flex:1}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Loại xe cơ giới đường bộ</Text>
                        </View>
                        <View style={[style.tableBorder, {borderColor: theme.textColor, height: 200, flex:1}]}>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:2}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>Tốc độ tối đa (km/h)</Text>
                            </View>
                            <View style={[style.tableBorder, {borderColor: theme.textColor, flex:5, flexDirection:'row'}]}>
                                <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                    <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>Đường đôi; đường một chiều có từ hai làn xe cơ giới trở lên</Text>
                                </View>
                                <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                    <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>Đường hai chiều; đường một chiều có một làn xe cơ giới</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 100, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Loại xe cơ giới đường bộ</Text>
                        </View>
                        <View style={[style.tableBorder, {borderColor: theme.textColor, flex:1, flexDirection:'row'}]}>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>60</Text>
                            </View>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>50</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={[style.textTrafficTerm, {color:theme.textColor}]}>Điều 7. Tốc độ tối đa cho phép xe cơ giới tham gia giao thông ngoài khu vực đông dân cư (trừ đường cao tốc)</Text>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 200, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, height: 200, flex:1}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Loại xe cơ giới đường bộ</Text>
                        </View>
                        <View style={[style.tableBorder, {borderColor: theme.textColor, height: 200, flex:1}]}>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:2}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>Tốc độ tối đa (km/h)</Text>
                            </View>
                            <View style={[style.tableBorder, {borderColor: theme.textColor, flex:5, flexDirection:'row'}]}>
                                <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                    <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>Đường đôi; đường một chiều có từ hai làn xe cơ giới trở lên</Text>
                                </View>
                                <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                    <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>Đường hai chiều; đường một chiều có một làn xe cơ giới</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 100, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Xe ô tô con, xe ô tô chở người đến 30 chỗ (trừ xe buýt); ô tô tải có trọng tải nhỏ hơn hoặc bằng 3,5 tấn.</Text>
                        </View>
                        <View style={[style.tableBorder, {borderColor: theme.textColor, flex:1, flexDirection:'row'}]}>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>90</Text>
                            </View>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>80</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 100, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Xe ô tô chở người trên 30 chỗ (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).</Text>
                        </View>
                        <View style={[style.tableBorder, {borderColor: theme.textColor, flex:1, flexDirection:'row'}]}>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>80</Text>
                            </View>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>70</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 100, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Ô tô buýt; ô tô đầu kéo kéo sơ mi rơ moóc; xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông).</Text>
                        </View>
                        <View style={[style.tableBorder, {borderColor: theme.textColor, flex:1, flexDirection:'row'}]}>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>70</Text>
                            </View>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>60</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 100, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông, ô tô xi téc.</Text>
                        </View>
                        <View style={[style.tableBorder, {borderColor: theme.textColor, flex:1, flexDirection:'row'}]}>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>60</Text>
                            </View>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>50</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={[style.textTrafficTerm, {color:theme.textColor}]}>Điều 9. Tốc độ của các loại xe cơ giới, xe máy chuyên dùng trên đường cao tốc</Text>
                    <Text style={[style.textTraffic, {color:theme.textColor}]}>1. Tốc độ tối đa cho phép khai thác trên đường cao tốc không vượt quá 120 km/h.</Text>
                    <Text style={[style.textTraffic, {color:theme.textColor}]}>2. Khi tham gia giao thông trên đường cao tốc, người lái xe, người điều khiển xe máy chuyên dùng phải tuân thủ tốc độ tối đa, tốc độ tối thiểu ghi trên biển báo hiệu đường bộ, sơn kẻ mặt đường trên các làn xe.</Text>
                    <Text style={[style.textTrafficTerm, {color:theme.textColor}]}>Điều 11. Khoảng cách an toàn giữa hai xe khi tham gia giao thông trên đường</Text>
                    <Text style={[style.textTraffic, {color:theme.textColor}]}>1. Khi điều khiển xe tham gia giao thông trên đường bộ, người lái xe, người điều khiển xe máy chuyên dùng phải giữ một khoảng cách an toàn đối với xe chạy liền trước xe của mình; ở nơi có biển báo "Cự ly tối thiểu giữa hai xe" phải giữ khoảng cách không nhỏ hơn trị số ghi trên biển báo.</Text>
                    <Text style={[style.textTraffic, {color:theme.textColor}]}>2. Khoảng cách an toàn giữa hai xe khi tham gia giao thông trên đường</Text>
                    <Text style={[style.textTraffic, {color:theme.textColor}]}>a, Trong điều kiện mặt đường khô ráo, khoảng cách an toàn ứng với mỗi tốc độ được quy định như sau:</Text>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 80, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:2}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Tốc độ lưu hành (km/h).</Text>
                        </View>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:3}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Khoảng cách an toàn tối thiểu (m)</Text>
                        </View>
                    </View>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 60, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:2}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>V = 60</Text>
                        </View>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:3}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>35</Text>
                        </View>
                    </View>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 60, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:2}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>60 {"<"} V ≤ 80</Text>
                        </View>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:3}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>70</Text>
                        </View>
                    </View>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 60, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:2}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>100 {"<"} V ≤ 120</Text>
                        </View>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:3}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>100</Text>
                        </View>
                    </View>
                    <Text style={[style.textTraffic, {color:theme.textColor}]}>Khi điều khiển xe chạy với tốc độ dưới 60 km/h, người lái xe phải chủ động giữ khoảng cách an toàn phù hợp với xe chạy liền trước xe của mình; khoảng cách này tùy thuộc vào mật độ phương tiện, tình hình giao thông thực tế để đảm bảo an toàn giao thông.</Text>
                    <Text style={[style.textTraffic, {color:theme.textColor}]}>b, Khi trời mưa, có sương mù, mặt đường trơn trượt, đường có địa hình quanh co, đèo dốc, tầm nhìn hạn chế, người lái xe phải điều chỉnh khoảng cách an toàn thích hợp lớn hơn trị số ghi trên biển báo hoặc trị số được quy định tại điểm a Khoản này.</Text>
                    <Text style={[style.textTrafficTitle, {color:theme.textColor}]}>II. Mức xử phạt cho hành vi vượt quá tốc độ quy định</Text>
                    <Text style={[style.textTrafficItali, {color:theme.textColor}]}>Tham khảo từ {" "}
                        <Text style={[style.textTrafficItali, style.Hyperlink, {marginTop: 0}]}
                            onPress={() => {
                            Linking.openURL(urlCircular2);
                            }}>
                            Nghị định 100/2019/NĐ-CP
                        </Text>
                    , có hiệu lực kể từ ngày 01/01/2020.</Text>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 200, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, height: 200, flex:1}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Loại xe cơ giới đường bộ</Text>
                        </View>
                        <View style={[style.tableBorder, {borderColor: theme.textColor, height: 200, flex:1}]}>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:2}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>Tốc độ vượt quá (km/h)</Text>
                            </View>
                            <View style={[style.tableBorder, {borderColor: theme.textColor, flex:5, flexDirection:'row'}]}>
                                <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                    <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>Mô tô; xe gắn máy (kể cả xe máy điện)</Text>
                                </View>
                                <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                    <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>Ô tô; xe khách; xe tải</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 100, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Từ 5 đến dưới 10</Text>
                        </View>
                        <View style={[style.tableBorder, {borderColor: theme.textColor, flex:1, flexDirection:'row'}]}>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>200.000 - 300.000</Text>
                            </View>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>800.000 - 1.000.000</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 100, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Từ 10 đến 20</Text>
                        </View>
                        <View style={[style.tableBorder, {borderColor: theme.textColor, flex:1, flexDirection:'row'}]}>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>600.000 - 1.000.000</Text>
                            </View>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>3.000.000 - 5.000.000</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 100, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Trên 20 đến 35</Text>
                        </View>
                        <View style={[style.tableBorder, {borderColor: theme.textColor, flex:1, flexDirection:'row'}]}>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>4.000.000 - 5.000.000</Text>
                            </View>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>6.000.000 - 8.000.000</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[style.tableBorder, {borderColor: theme.textColor, height: 100, flexDirection:'row'}]}>
                        <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                            <Text style={[style.textTraffic, {color:theme.textColor, marginTop:0}]}>Trên 35</Text>
                        </View>
                        <View style={[style.tableBorder, {borderColor: theme.textColor, flex:1, flexDirection:'row'}]}>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>4.000.000 - 5.000.000</Text>
                            </View>
                            <View style={[style.tableBorder, style.container, {borderColor: theme.textColor, flex:1}]}>
                                <Text style={[style.textTraffic, {color:theme.textColor, marginTop: 0}]}>10.000.000 - 12.000.000</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default TrafficScreen;