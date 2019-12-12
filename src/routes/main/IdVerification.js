import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { Button, DatePicker, Form, Icon, Input, Radio, Select, Spin, Upload, Row, Col } from 'antd'
import _ from 'lodash'
import CountrySelect from '../../components/CountrySelect'
import moment from 'moment'
import { IconNotification } from '../../components/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'
import { updateIdDocument } from '../../api/axiosAPIs'

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 10},
    md: {span: 8},
    lg: {span: 6}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14},
    md: {span: 12},
    lg: {span: 6}
  }
}

const {Option} = Select

const FormItem = Form.Item
const RadioGroup = Radio.Group
const ID_DOCS = ['id_card', 'passport', 'driver_license']
const PROOF_DOCS = ['bank_statement', 'tax_bill']

class IdVerification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: false,
      name: '',
      gender: '',
      birth: new Date(),
      country: '',
      state: '',
      city: '',
      address: '',
      zipcode: '',
      docType: ID_DOCS[0],
      docNumber: '',
      docPhoto: null,
      proof: PROOF_DOCS[0],
      proofOfResidence: '',
      proofPhoto1: null,
      proofPhoto2: null,
      selfiePhoto: null,
      expandCountries: false,
      countryName: '',
      countryShortCode: null,
      filteredCountries: CountrySelect,
      expandGender: false,
      province: '',
      expandDocTypes: false,
      nameVaild: true,
      docNumberValid: true,
      docFileData: null
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    return null
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log(err, values)
      if (!err) {
        this.doSubmitVerification(values)
      }
    })
  }

  doSubmitVerification = (data) => {
    const {countryShortCode} = this.state
    let formData = new FormData()

    formData.append('id_document[name]', data.name)
    formData.append('id_document[gender]', data.gender)
    formData.append('id_document[id_document_number]', data.docNumber)
    formData.append('id_document[id_bill_type]', data.proof)

    if (data.birth) {
      formData.append('id_document[birth_date]', data.birth)
    }
    if (data.address) {
      formData.append('id_document[address]', data.address)
    }
    if (data.city) {
      formData.append('id_document[city]', data.city)
    }
    if (countryShortCode) {
      formData.append('id_document[country]', countryShortCode)
    }
    if (data.province) {
      formData.append('id_document[state]', data.province)
    }
    if (data.zipcode) {
      formData.append('id_document[zipcode]', data.zipcode)
    }
    if (data.docType) {
      formData.append('id_document[id_document_type]', data.docType)
    }
    if (data.docFileData) {
      formData.append('id_document[id_document_file_attributes][file]', data.docFileData.file)
    }
    if (data.proofPhoto1) {
      formData.append('id_document[id_bill_file1_attributes][file]', data.proofPhoto1.file)
    }
    if (data.proofPhoto2) {
      formData.append('id_document[id_bill_file2_attributes][file]', data.proofPhoto2.file)
    }
    if (data.selfiePhoto) {
      formData.append('id_document[id_selfie_file_attributes][file]', data.selfiePhoto.file)
    }

    updateIdDocument(formData)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'id.document.submitted'}))
        this.props.history.push('/user')
      })
  }

  componentDidMount() {
    this.props.getAuthStatus()
  }

  onChangeCountry = (countryShortCode) => {
    this.setState({countryShortCode})
  }

  render() {
    const {intl} = this.props
    const {loader} = this.state
    const {getFieldDecorator} = this.props.form
    const {name, gender, birth, country, state, city, address, zipcode, docType, docNumber, proof, proofPhoto1, proofPhoto2, selfiePhoto, docFileData} = this.state

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="id.verification"/></h1>
        <Spin spinning={loader} size="large">
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'name'})}>
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }]
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'gender'})}>
              {getFieldDecorator('gender', {
                initialValue: _.isEmpty(gender) ? 'male' : gender,
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }],
                valuePropName: 'defaultValue'
              })(
                <RadioGroup>
                  <Radio value="male"><FormattedMessage id="gender.male"/></Radio>
                  <Radio value="female"><FormattedMessage id="gender.female"/></Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'birth'})}>
              {getFieldDecorator('birth', {
                initialValue: _.isEmpty(birth) ? moment() : moment(birth, 'YYYY-MM-DD'),
                rules: [{
                  type: 'object'
                }]
              })(
                <DatePicker className="gx-w-100"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'country'})}>
              {getFieldDecorator('country', {
                initialValue: country
              })(
                <CountrySelect onChange={this.onChangeCountry}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'state.or.province'})}>
              {getFieldDecorator('state', {
                initialValue: state
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'city'})}>
              {getFieldDecorator('city', {
                initialValue: city
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'address'})}>
              {getFieldDecorator('address', {
                initialValue: address
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'zipcode'})}>
              {getFieldDecorator('zipcode', {
                initialValue: zipcode
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'document.type'})}>
              {getFieldDecorator('docType', {
                initialValue: docType,
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }]
              })(
                <Select>
                  {
                    ID_DOCS.map(idDoc => {
                      return (
                        <Option
                          key={idDoc}
                        >
                          <FormattedMessage id={idDoc}/>
                        </Option>
                      )
                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'document.number'})}>
              {getFieldDecorator('docNumber', {
                initialValue: docNumber,
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }]
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'document.photo'})}>
              {getFieldDecorator('docFileData', {
                initialValue: docFileData
              })(
                <Upload
                  beforeUpload={() => {
                    return false
                  }}
                >
                  <Button>
                    <Icon type="upload"/>
                    <FormattedMessage id="upload"/>
                  </Button>
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'proof.of.residence'})}>
              {getFieldDecorator('proof', {
                initialValue: proof,
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }]
              })(
                <Select>
                  {
                    PROOF_DOCS.map(proofDoc => {
                      return (
                        <Option
                          key={proofDoc}
                        >
                          <FormattedMessage id={proofDoc}/>
                        </Option>
                      )
                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'proof.of.residence.photo'})}>
              {getFieldDecorator('proofPhoto1', {
                initialValue: proofPhoto1
              })(
                <Upload
                  action=""
                  beforeUpload={() => {
                    return false
                  }}
                >
                  <Button>
                    <Icon type="upload"/>
                    <FormattedMessage id="upload"/>
                  </Button>
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'proof.of.residence.photo'})}>
              {getFieldDecorator('proofPhoto2', {
                initialValue: proofPhoto2
              })(
                <Upload
                  action=""
                  beforeUpload={() => {
                    return false
                  }}
                >
                  <Button>
                    <Icon type="upload"/>
                    <FormattedMessage id="upload"/>
                  </Button>
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({id: 'selfie.photo'})}>
              {getFieldDecorator('selfiePhoto', {
                initialValue: selfiePhoto
              })(
                <Upload
                  action=""
                  beforeUpload={() => {
                    return false
                  }}
                >
                  <Button>
                    <Icon type="upload"/>
                    <FormattedMessage id="upload"/>
                  </Button>
                </Upload>
              )}
            </FormItem>
            <Row>
              <Col xs={24} sm={12} md={8} lg={6}>
              </Col>
              <Col className="gx-ml-3">
                <Button type="primary" htmlType="submit">
                  <FormattedMessage id="submit"/>
                </Button>
              </Col>
            </Row>
          </Form>
        </Spin>
      </div>
    )
  }
}

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

const mapDispatchToProps = {
  getAuthStatus
}

const WrappedIdVerificationForm = Form.create()(IdVerification)

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedIdVerificationForm))
