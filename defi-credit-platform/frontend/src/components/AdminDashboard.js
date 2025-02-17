import React from 'react';
import {
  Box,
  Container,
  Grid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from '@chakra-ui/react';

const StatCard = ({ title, value, helpText, colorScheme = 'blue' }) => {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue('white', 'gray.800')}
      borderColor={useColorModeValue(`${colorScheme}.100`, `${colorScheme}.800`)}
    >
      <Stat>
        <StatLabel fontSize="lg">{title}</StatLabel>
        <StatNumber fontSize="2xl" color={`${colorScheme}.500`}>{value}</StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
      </Stat>
    </Box>
  );
};

const AdminDashboard = ({ data }) => {
  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">平台运营概况</Heading>
        
        <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6}>
          <StatCard
            title="活跃贷款总额"
            value="$1,250,000"
            helpText="较上月增长 12%"
            colorScheme="blue"
          />
          <StatCard
            title="当月违约率"
            value="2.3%"
            helpText="较上月下降 0.5%"
            colorScheme="green"
          />
          <StatCard
            title="新增借款人"
            value="156"
            helpText="本月新增"
            colorScheme="purple"
          />
          <StatCard
            title="平均信用分数"
            value="85"
            helpText="较上月提升 3 分"
            colorScheme="orange"
          />
        </Grid>

        <Box mt={8}>
          <Heading size="md" mb={4}>紧急运营情况</Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
              <Heading size="sm" mb={4}>高风险贷款组</Heading>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>组ID</Th>
                    <Th>风险等级</Th>
                    <Th>逾期天数</Th>
                    <Th>待还金额</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>G001</Td>
                    <Td color="red.500">高</Td>
                    <Td>15</Td>
                    <Td>$2,500</Td>
                  </Tr>
                  <Tr>
                    <Td>G008</Td>
                    <Td color="orange.500">中</Td>
                    <Td>7</Td>
                    <Td>$1,800</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>

            <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
              <Heading size="sm" mb={4}>系统健康状况</Heading>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text mb={2}>智能合约执行成功率</Text>
                  <Progress value={98} colorScheme="green" />
                </Box>
                <Box>
                  <Text mb={2}>信用评估系统响应时间</Text>
                  <Progress value={85} colorScheme="blue" />
                </Box>
                <Box>
                  <Text mb={2}>资金池流动性</Text>
                  <Progress value={75} colorScheme="orange" />
                </Box>
              </VStack>
            </Box>
          </Grid>
        </Box>

        <Box mt={8}>
          <Heading size="md" mb={4}>社会影响力指标</Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            <StatCard
              title="女性创业者比例"
              value="68%"
              helpText="目标: 70%"
              colorScheme="pink"
            />
            <StatCard
              title="家庭收入提升"
              value="45%"
              helpText="平均提升幅度"
              colorScheme="green"
            />
            <StatCard
              title="社区发展项目"
              value="23"
              helpText="进行中项目数量"
              colorScheme="purple"
            />
          </Grid>
        </Box>
      </VStack>
    </Container>
  );
};

export default AdminDashboard;
