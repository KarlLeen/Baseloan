import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  VStack,
  HStack,
  Text,
  Progress,
  Heading,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardHeader,
  CardBody,
  useColorModeValue,
} from '@chakra-ui/react';

const UserDashboard = ({ account, loanData = {} }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('white', 'gray.700');

  // 模拟数据
  const teamData = {
    teamName: "创业者联盟",
    members: 8,
    totalLoans: 50000,
    repaidLoans: 35000,
    nextPayment: "2025-03-01",
    creditScore: 85,
    repaymentRate: 95,
    loanHistory: [
      { date: "2025-01-15", amount: 10000, status: "已还清" },
      { date: "2025-02-01", amount: 15000, status: "还款中" },
      { date: "2025-02-15", amount: 25000, status: "审批中" },
    ]
  };

  return (
    <VStack spacing={6} align="stretch" w="full">
      {/* 个人信息概览 */}
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6}>
        <GridItem colSpan={1}>
          <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
            <CardHeader pb={0}>
              <Heading size="md">个人信用评分</Heading>
            </CardHeader>
            <CardBody>
              <VStack align="center" spacing={4}>
                <Box position="relative" display="inline-block">
                  <Text
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    fontSize="2xl"
                    fontWeight="bold"
                  >
                    {teamData.creditScore}
                  </Text>
                  <CircularProgressWithScore value={teamData.creditScore} />
                </Box>
                <Badge colorScheme="green">信用良好</Badge>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem colSpan={1}>
          <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
            <CardHeader pb={0}>
              <Heading size="md">团队还款情况</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <Stat>
                  <StatLabel>团队还款率</StatLabel>
                  <StatNumber>{teamData.repaymentRate}%</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    较上月提升 2.3%
                  </StatHelpText>
                </Stat>
                <Progress
                  value={teamData.repaymentRate}
                  colorScheme="green"
                  size="lg"
                  width="100%"
                />
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem colSpan={1}>
          <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
            <CardHeader pb={0}>
              <Heading size="md">下次还款</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <Stat>
                  <StatLabel>还款日期</StatLabel>
                  <StatNumber>{teamData.nextPayment}</StatNumber>
                  <StatHelpText>
                    剩余 12 天
                  </StatHelpText>
                </Stat>
                <HStack justify="space-between" width="100%">
                  <Text>应还金额：</Text>
                  <Text fontWeight="bold">5,000 USDT</Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* 团队信息 */}
      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
        <CardHeader>
          <Heading size="md">团队信息</Heading>
        </CardHeader>
        <CardBody>
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={6}>
            <Stat>
              <StatLabel>团队名称</StatLabel>
              <StatNumber fontSize="xl">{teamData.teamName}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>成员数量</StatLabel>
              <StatNumber fontSize="xl">{teamData.members} 人</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>累计借款</StatLabel>
              <StatNumber fontSize="xl">{teamData.totalLoans} USDT</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>已还金额</StatLabel>
              <StatNumber fontSize="xl">{teamData.repaidLoans} USDT</StatNumber>
            </Stat>
          </Grid>
        </CardBody>
      </Card>

      {/* 借款历史 */}
      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
        <CardHeader>
          <Heading size="md">借款历史</Heading>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>日期</Th>
                  <Th>金额 (USDT)</Th>
                  <Th>状态</Th>
                </Tr>
              </Thead>
              <Tbody>
                {teamData.loanHistory.map((loan, index) => (
                  <Tr key={index}>
                    <Td>{loan.date}</Td>
                    <Td>{loan.amount}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          loan.status === "已还清" ? "green" :
                          loan.status === "还款中" ? "yellow" :
                          "blue"
                        }
                      >
                        {loan.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </VStack>
  );
};

// 圆形进度条组件
const CircularProgressWithScore = ({ value }) => {
  const size = 120;
  const thickness = 8;
  const angle = (value / 100) * 360;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = (angle / 360) * circumference;
  const gradient = useColorModeValue(
    "linear-gradient(45deg, #48BB78, #4299E1)",
    "linear-gradient(45deg, #68D391, #63B3ED)"
  );

  return (
    <Box position="relative" width={size} height={size}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={useColorModeValue("gray.100", "gray.600")}
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={gradient}
          strokeWidth={thickness}
          strokeDasharray={`${strokeDasharray} ${circumference}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: "stroke-dasharray 0.5s ease",
          }}
        />
      </svg>
    </Box>
  );
};

export default UserDashboard;
