import React from 'react';
import {
  View,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';

import Icon from 'react-native-vector-icons/Ionicons';

export default class ShowPointsItem extends React.Component {
  state = {
    modalVisible: false,
    degree: '0deg',
  };

  showPoints = () => {
    if (this.props.item.kazPoint) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (this.state.degree === '90deg') {
        this.setState({
          modalVisible: !this.state.modalVisible,
          degree: '0deg',
        });
      } else {
        this.setState({
          modalVisible: !this.state.modalVisible,
          degree: '90deg',
        });
      }
    }
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    const {item} = this.props;
    return (
      <View style={styles.pointView}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => this.showPoints()}>
          <Text style={styles.majorName}> {item.majorName}</Text>
        </TouchableOpacity>

        {this.state.modalVisible && (
          <Table
            style={{flex: 1, flexDirection: 'column'}}
            borderStyle={{
              borderWidth: 0.5,
              borderColor: '#bdbfc1',
            }}>
            {/* <Table borderStyle={{ borderColor: '#C1C0B9' }}>
							<Row
								data={['Проходные баллы на грант(по результатам 2018)']}
								widthArr={250}
								heightArr={20}
								textStyle={styles.textTitle}
							/>
						</Table> */}
            <TableWrapper style={styles.wrapper}>
              <Col
                data={['По общему конкурсу', 'По сельской квоте']}
                style={styles.title}
                heightArr={[28, 28, 28, 28]}
                textStyle={styles.text}
              />
              <Col
                data={[
                  item.kazPoint !== 0 ? item.kazPoint : 'Данных нет',
                  item.kazSelPoint !== 0 ? item.kazSelPoint : 'Данных нет',
                ]}
                style={styles.title}
                heightArr={[28, 28, 28, 28]}
                textStyle={styles.text}
              />
              <Col
                data={[
                  item.rusPoint !== 0 ? item.rusPoint : 'Данных нет',
                  item.rusSelPoint !== 0 ? item.rusSelPoint : 'Данных нет',
                ]}
                style={styles.title}
                heightArr={[28, 28, 28, 28]}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  majorName: {
    color: '#4e5056',
    fontSize: 13,
    marginBottom: 5,

    fontWeight: 'bold',
  },
  pointView: {
    margin: 5,
    padding: 2,
  },
  wrapper: {flexDirection: 'row'},
  title: {
    flex: 2,
    backgroundColor: '#f6f8fa',
    marginHorizontal: 2,
    marginVertical: 3,
    justifyContent: 'flex-start',
  },
  textTitle: {
    textAlign: 'center',
    color: '#4e5056',
    fontSize: 13,
  },
  row: {flex: 0.5, height: 28, alignItems: 'flex-start'},
  text: {textAlign: 'center', color: '#4e5056', fontSize: 12},
});
