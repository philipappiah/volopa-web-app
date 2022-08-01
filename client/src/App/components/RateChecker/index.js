import { useContext, useState, useEffect  } from 'react'
import { CurrencyContext } from '../../../Contexts/currencyContext';
import { Row, Col, Typography, Card, Form, Input, Select, Space, Progress, Button, Modal } from 'antd'
import { getConversion } from '../../../APIs';

function RateChecker() {

    const { currencies } = useContext(CurrencyContext)

    const [fromCurrency, setFromCurrency] = useState(currencies.length ? currencies[0].name : '')
    const [toCurrency, setToCurrency] = useState(currencies.length > 1 ? currencies[1].name : '')
    const [fixedRate, setFixedRate] = useState(1.19)
    const [currentRate, setCurrentRate] = useState(1)
    
    const [amount, setAmount] = useState(1)
    const [value, setValue] = useState(1)


    const [isModalVisible, setIsModalVisible] = useState(false);

  
  
    const handleOk = () => {
        setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
 

    

    const handleChangeFrom = (value) => {
        setFromCurrency(value)
    };

    const handleChangeTo = (value) => {
        setToCurrency(value)
    };

    const handleInputChange = (e) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;

       if (reg.test(inputValue) ) {
        
         setAmount(inputValue)
        }
    }


   

    const onConvert = () => {

        if(!amount){
            return
        }

        if (Number(amount) <= 0){
            return
        }
     

        getConversion(fromCurrency, toCurrency, amount).then(res=>{
            const {value, rate} = res.data
            setCurrentRate(rate)
            setValue(value)
            setIsModalVisible(true);

            
            
        }).catch(err=>{
            console.log(err)
        })
       


    }

   

    


    useEffect(() => {
        

      
        getConversion(fromCurrency, toCurrency, amount).then(res=>{
            
            const {value, rate} = res.data
            setValue(value)
            
            setFixedRate(rate)
        }).catch(err=>{
            console.log(err)
        })
    

    },[])

    return (
        <>
            <Row>
                <Col span={24}>
                    <Typography.Text className='dark-green medium fs-25px'>Rate Checker</Typography.Text>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
              
      <Modal title="Rate Checker" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Amount : {amount}</p>
        <p>From : {fromCurrency}</p>
        <p>To : {toCurrency} </p>
        <p>Converted Value : {value.toFixed(2)} {toCurrency}</p>
        <p>Rate:  1 {fromCurrency} = {currentRate.toFixed(2)} {toCurrency}</p>
      </Modal>
                    <Card>
                        <Card.Grid className='full-width rounded b-g hover-no-border'>
                            <Form layout='vertical'>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            name='convertTo'
                                            label={<span className='muli semi-bold fs-18px'>Enter Amount</span>}
                                        >
                                            <Row gutter={8}>
                                                <Col span={24}>
                                                    <Input onChange={handleInputChange} maxLength={25} placeholder='Enter Amount' />
                                                </Col>

                                            </Row>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            name='convertTo'
                                            label={<span className='muli semi-bold fs-18px'>Convert From</span>}
                                        >

                                            <Row gutter={8}>
                                                <Col span={24}>
                                                    <Select
                                                        className='dark-green'
                                                        onChange={handleChangeFrom}
                                                        showSearch
                                                        filterOption={(input, option) => {
                                                            if (option.children)
                                                                return option.children.toLowerCase().includes(input.toLowerCase())
                                                            else if (option.label)
                                                                return option.label.toLowerCase().includes(input.toLowerCase())
                                                        }}
                                                        defaultValue={currencies.length ? currencies[0].name : ''}
                                                    >
                                                        <Select.OptGroup label='Common'>
                                                            {
                                                                currencies.filter(c => c.popularity >= 5).map((currency, index) => (
                                                                    <Select.Option key={currency.name} value={currency.name}>{currency.name}</Select.Option>
                                                                ))
                                                            }
                                                        </Select.OptGroup>

                                                        <Select.OptGroup label='other'>
                                                            {
                                                                currencies.filter(c => c.popularity < 5).map((currency, index) => (
                                                                    <Select.Option key={currency.name} value={currency.name}>{currency.name}</Select.Option>
                                                                ))
                                                            }
                                                        </Select.OptGroup>


                                                    </Select>
                                                </Col>

                                            </Row>
                                        </Form.Item>
                                        <Form.Item
                                            name='convertFrom'
                                            label={<span className='muli semi-bold fs-18px'>Convert To</span>}
                                        >
                                            <Row gutter={8}>
                                                <Col span={24}>
                                                    <Select
                                                        className='dark-green'
                                                        onChange={handleChangeTo}
                                                        showSearch
                                                        filterOption={(input, option) => {
                                                            if (option.children)
                                                                return option.children.toLowerCase().includes(input.toLowerCase())
                                                            else if (option.label)
                                                                return option.label.toLowerCase().includes(input.toLowerCase())
                                                        }}

                                                        defaultValue={currencies.length > 1 ? currencies[1].name : ''}

                                                    >
                                                        <Select.OptGroup label='Common'>
                                                            {
                                                                currencies.filter(c => c.popularity >= 5).map((currency, index) => (
                                                                    <Select.Option key={currency.name} value={currency.name}>{currency.name}</Select.Option>
                                                                ))
                                                            }
                                                        </Select.OptGroup>

                                                        <Select.OptGroup label='other'>
                                                            {
                                                                currencies.filter(c => c.popularity < 5).map((currency, index) => (
                                                                    <Select.Option key={currency.name} value={currency.name}>{currency.name}</Select.Option>
                                                                ))
                                                            }
                                                        </Select.OptGroup>

                                                    </Select>
                                                </Col>

                                            </Row>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row align='bottom'>
                                    <Col span={12}>
                                    
                                        <Space>
                                            <Progress type='circle' percent={75} width={40} format={() => `30s`} />
                                            <Space direction='vertical' size={0}>
                                                <Typography.Text className='muli semi-bold light-green'>FX Rate</Typography.Text>
                                                
                                                <Typography.Text className='muli semi-bold light-green'>1 GBP = {fixedRate.toFixed(2)} EUR</Typography.Text>
                                            </Space>
                                        </Space>
                                    </Col>
                                    <Col span={12} className='right-align-text'>
                                        <Button onClick={onConvert} type='primary' htmlType='submit'>Convert</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Grid>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default RateChecker;