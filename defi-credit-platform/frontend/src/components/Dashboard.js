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
  useColorModeValue,
} from '@chakra-ui/react';

const StatCard = ({ title, value, helpText }) => {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stat>
        <StatLabel fontSize="lg">{title}</StatLabel>
        <StatNumber fontSize="2xl">{value}</StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
      </Stat>
    </Box>
  );
};

const ProgressSection = ({ title, value, max }) => {
  return (
    <Box>
      <Text mb={2}>{title}</Text>
      <Progress value={(value / max) * 100} colorScheme="blue" />
      <Text mt={1} fontSize="sm" color="gray.500">
        {value} / {max}
      </Text>
    </Box>
  );
};

const UserDashboard = ({ userData }) => {
  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">个人贷款情况</Heading>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
          <StatCard
            title="贷款金额"
            value={`$${userData.loanAmount}`}
            helpText={`利率: ${userData.interestRate}%`}
          />
          <StatCard
            title="已还金额"
            value={`$${userData.repaidAmount}`}
            helpText={`下次还款日期: ${userData.nextPaymentDate}`}
          />
          <StatCard
            title="团队信用分数"
            value={userData.groupCreditScore}
            helpText={`排名: 前${userData.groupRanking}%`}
          />
        </Grid>

        <Box mt={8}>
          <Heading size="md" mb={4}>小组借贷情况</Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            <Box>
              <ProgressSection
                title="小组还款进度"
                value={userData.groupRepaidAmount}
                max={userData.groupTotalAmount}
              />
            </Box>
            <Box>
              <ProgressSection
                title="信用额度使用"
                value={userData.creditUsed}
                max={userData.creditLimit}
              />
            </Box>
          </Grid>
        </Box>

        <Box mt={8}>
          <Heading size="md" mb={4}>社会影响</Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            <ProgressSection
              title="业务增长"
              value={30}
              max={100}
            />
            <ProgressSection
              title="家庭提升效率"
              value={40}
              max={100}
            />
            <ProgressSection
              title="社区贡献"
              value={25}
              max={100}
            />
          </Grid>
        </Box>
      </VStack>
    </Container>
  );
};

export default UserDashboard;
