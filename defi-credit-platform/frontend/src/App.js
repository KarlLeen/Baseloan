import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  useToast,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ethers } from 'ethers';
import MicroLendingPlatform from './contracts/MicroLendingPlatform.json';
import GroupLending from './components/GroupLending';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import LandingPage from './components/LandingPage';

const LENDING_PLATFORM_ADDRESS = "0x03A54407c196c56FA54732FfBFF1FDfaE6b79ADb";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [ethUsdtPrice, setEthUsdtPrice] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'user' or 'admin'
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'assessment', 'dashboard'
  const [isConnecting, setIsConnecting] = useState(false); // 添加连接状态
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headingColor = useColorModeValue('blue.600', 'blue.300');
  const tabListBg = useColorModeValue('gray.50', 'gray.700');

  const fetchEthPrice = async () => {
    if (contract) {
      try {
        const priceOracleAddress = await contract.priceOracle();
        const priceOracleAbi = [
          "function getLatestETHUSDTPrice() view returns (uint256)"
        ];
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const priceOracle = new ethers.Contract(priceOracleAddress, priceOracleAbi, provider);
        
        const price = await priceOracle.getLatestETHUSDTPrice();
        console.log('Fetched ETH price:', ethers.utils.formatUnits(price, 8));
        setEthUsdtPrice(price);
      } catch (error) {
        console.error('Error fetching ETH price:', error);
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await connectWallet();
        }
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (contract) {
      fetchEthPrice();
      const interval = setInterval(fetchEthPrice, 60000);
      return () => clearInterval(interval);
    }
  }, [contract]);

  const connectWallet = async () => {
    console.log('Connecting wallet...');
    setIsConnecting(true);
    if (!window.ethereum) {
      toast({
        title: "未检测到钱包",
        description: "请安装 MetaMask 钱包后再试。点击确定前往安装。",
        status: "warning",
        duration: 10000,
        isClosable: true,
        onCloseComplete: () => {
          window.open('https://metamask.io/download.html', '_blank');
        }
      });
      return;
    }

    try {
      // 检查网络
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      console.log('Current chainId:', chainId);
      
      // Sepolia 测试网的 chainId 是 0xaa36a7
      if (chainId !== '0xaa36a7') {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }],
          });
        } catch (switchError) {
          // 如果用户没有 Sepolia 网络，添加它
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0xaa36a7',
                  chainName: 'Sepolia Test Network',
                  nativeCurrency: {
                    name: 'SepoliaETH',
                    symbol: 'ETH',
                    decimals: 18
                  },
                  rpcUrls: ['https://sepolia.infura.io/v3/'],
                  blockExplorerUrls: ['https://sepolia.etherscan.io']
                }],
              });
            } catch (addError) {
              throw new Error('请手动添加 Sepolia 测试网络');
            }
          } else {
            throw switchError;
          }
        }
      }

      // 请求连接钱包
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      // 创建合约实例
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      console.log('Creating contract instance...');
      const contract = new ethers.Contract(
        LENDING_PLATFORM_ADDRESS,
        MicroLendingPlatform.abi,
        signer
      );
      console.log('Contract instance created');
      
      setAccount(accounts[0]);
      setContract(contract);
      setUserRole('user'); // 默认设置为用户角色
      
      toast({
        title: "钱包已连接",
        description: `已连接到地址: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      await fetchEthPrice();

      // 监听账户变化
      window.ethereum.on('accountsChanged', (newAccounts) => {
        if (newAccounts.length === 0) {
          // 用户断开了钱包连接
          setAccount(null);
          setContract(null);
          setUserRole(null);
          setCurrentView('landing');
          toast({
            title: "钱包已断开",
            description: "您的钱包连接已断开",
            status: "info",
            duration: 5000,
            isClosable: true,
          });
        } else {
          // 用户切换了账户
          setAccount(newAccounts[0]);
          toast({
            title: "账户已切换",
            description: `当前账户: ${newAccounts[0].slice(0, 6)}...${newAccounts[0].slice(-4)}`,
            status: "info",
            duration: 5000,
            isClosable: true,
          });
        }
      });

      // 监听网络变化
      window.ethereum.on('chainChanged', (newChainId) => {
        if (newChainId !== '0xaa36a7') {
          toast({
            title: "网络错误",
            description: "请切换到 Sepolia 测试网络",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
        // MetaMask 建议页面刷新
        window.location.reload();
      });

    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "连接错误",
        description: error.message || "连接钱包时发生错误",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setCurrentView('dashboard');
    toast({
      title: `已切换到${role === 'admin' ? '管理员' : '用户'}模式`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const renderDisconnectedContent = () => (
    <Box
      p={10}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      textAlign="center"
    >
      <VStack spacing={4}>
        <Heading size="md" color="gray.500">
          请连接钱包以继续
        </Heading>
        <Text color="gray.400">
          连接钱包后即可使用小组贷款、查看贷款记录和参与 DAO 治理
        </Text>
      </VStack>
    </Box>
  );

  const renderContent = () => {
    if (!account) {
      return renderDisconnectedContent();
    }

    if (currentView === 'landing') {
      return <LandingPage 
        onStartAssessment={() => setCurrentView('assessment')} 
        onLogin={() => setCurrentView('dashboard')} 
      />;
    }

    if (currentView === 'assessment') {
      return <GroupLending 
        contract={contract} 
        account={account} 
        ethUsdtPrice={ethUsdtPrice} 
      />;
    }

    if (currentView === 'dashboard') {
      return userRole === 'admin' ? 
        <AdminDashboard /> : 
        <UserDashboard account={account} />;
    }

    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        borderColor={borderColor}
        overflow="hidden"
      >
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList p={4} bg={tabListBg}>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>
              小组贷款
            </Tab>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>
              我的贷款
            </Tab>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>
              DAO治理
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <GroupLending
                contract={contract}
                account={account}
                ethUsdtPrice={ethUsdtPrice}
              />
            </TabPanel>
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">我的贷款记录</Heading>
                <Box
                  p={6}
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor={borderColor}
                >
                  <Text color="gray.500">暂无贷款记录</Text>
                </Box>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">DAO治理</Heading>
                <Box
                  p={6}
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor={borderColor}
                >
                  <Text color="gray.500">即将开放</Text>
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    );
  };

  return (
    <ChakraProvider>
      <Box minH="100vh" bg={bgColor}>
        <Container maxW="container.xl" py={10}>
          <VStack spacing={8} align="stretch">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Heading size="xl" color={headingColor}>
                普惠金融 DeFi 平台
              </Heading>
              <HStack spacing={4}>
                {account && (
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      {userRole === 'admin' ? '管理员模式' : '用户模式'}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handleRoleSelect('user')}>用户模式</MenuItem>
                      <MenuItem onClick={() => handleRoleSelect('admin')}>管理员模式</MenuItem>
                    </MenuList>
                  </Menu>
                )}
                <Button
                  onClick={connectWallet}
                  colorScheme="blue"
                  size="lg"
                  variant="outline"
                  isLoading={isConnecting}
                  loadingText="连接中"
                >
                  {account
                    ? `已连接: ${account.slice(0, 6)}...${account.slice(-4)}`
                    : '连接钱包'}
                </Button>
              </HStack>
            </Box>

            {renderContent()}
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
