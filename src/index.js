import dva, { connect } from 'dva';
import createLoading from 'dva-loading';
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import './index.html';
import './index.less';



// 1. Initialize
const app = dva();

// 2. Plugin
app.use(createLoading());

// 3. Model
app.model(require('./models/product'));
app.model(require('./models/order'));
app.model(require('./models/info'));
app.model(require('./models/customer'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
