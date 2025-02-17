import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  Icon,
  Divider,
  Badge,
  Image,
  Stack,
  Circle,
} from '@chakra-ui/react';
import {
  FaRobot,
  FaUserTie,
  FaChartLine,
  FaUsers,
  FaHandshake,
  FaBrain,
  FaLock,
  FaRegHandshake,
  FaClock,
  FaUserFriends,
  FaFemale,
} from 'react-icons/fa';

const FeatureWithIcon = ({ title, text, icon, color = 'blue.500', bg = 'blue.50' }) => {
  const boxBg = useColorModeValue(bg, 'gray.700');
  const iconBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Stack spacing={4} p={6} bg={boxBg} borderRadius="lg" position="relative">
      <Circle
        size={12}
        bg={iconBg}
        color={color}
        shadow="lg"
        position="relative"
      >
        <Icon as={icon} w={6} h={6} />
      </Circle>
      <Stack spacing={2}>
        <Heading size="md" color={useColorModeValue('gray.800', 'white')}>
          {title}
        </Heading>
        <Text color={textColor}>{text}</Text>
      </Stack>
    </Stack>
  );
};

const Feature = ({ title, text, icon, isHighlighted }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColorBase = useColorModeValue('gray.200', 'gray.600');

  return (
    <VStack
      p={6}
      shadow={isHighlighted ? 'lg' : 'md'}
      borderWidth="2px"
      borderColor={isHighlighted ? 'blue.400' : borderColorBase}
      borderRadius="lg"
      bg={bgColor}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      transition="all 0.3s"
      spacing={4}
      align="start"
      position="relative"
    >
      {isHighlighted && (
        <Badge
          position="absolute"
          top="-2"
          right="-2"
          colorScheme="blue"
          fontSize="sm"
          px={2}
          py={1}
          borderRadius="full"
        >
          AI 特色
        </Badge>
      )}
      <Icon as={icon} w={8} h={8} color={isHighlighted ? 'blue.400' : 'blue.500'} />
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
    </VStack>
  );
};

const ProcessStep = ({ number, title, description }) => (
  <HStack spacing={4} width="full" p={4}>
    <Box
      w={10}
      h={10}
      borderRadius="full"
      bg="blue.400"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="lg"
      fontWeight="bold"
    >
      {number}
    </Box>
    <VStack align="start" spacing={1}>
      <Heading size="sm">{title}</Heading>
      <Text color="gray.600" fontSize="sm">
        {description}
      </Text>
    </VStack>
  </HStack>
);

const LandingPage = ({ onStartAssessment, onLogin }) => {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      <Container maxW="container.xl" py={10}>
        <VStack spacing={16}>
          {/* Hero Section */}
          <Box textAlign="center" w="full">
            <VStack spacing={6}>
              <Heading
                as="h1"
                size="2xl"
                bgGradient="linear(to-r, blue.400, teal.400)"
                backgroundClip="text"
              >
                BaseLoan AI 智能信贷
              </Heading>
              <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')} maxW="2xl">
                首个由 AI Agent 进行信用评估的去中心化小额信贷平台
              </Text>
            </VStack>
          </Box>

          {/* AI Interview Process */}
          <Box w="full">
            <VStack spacing={8} align="start">
              <Heading size="lg">AI 智能评估流程</Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
                <ProcessStep
                  number="1"
                  title="AI Agent 面试"
                  description="智能 AI 助理通过自然对话了解您的信用状况"
                />
                <ProcessStep
                  number="2"
                  title="多维度分析"
                  description="综合分析您的职业、收入、社交网络等多个维度"
                />
                <ProcessStep
                  number="3"
                  title="实时信用评分"
                  description="基于 AI 分析结果，实时生成您的信用评分"
                />
              </SimpleGrid>
            </VStack>
          </Box>

          <Divider />

          {/* AI Features */}
          <Box w="full">
            <VStack spacing={8}>
              <Heading size="lg">AI 智能评估</Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="full">
                <Feature
                  icon={FaRobot}
                  title="AI 智能面试"
                  text="无需繁琐的材料，只需与 AI 助理进行自然对话，即可完成信用评估。"
                  isHighlighted={true}
                />
                <Feature
                  icon={FaBrain}
                  title="智能信用评分"
                  text="AI 系统实时分析对话内容，生成准确的信用评分，确保公平公正。"
                  isHighlighted={true}
                />
                <Feature
                  icon={FaUserTie}
                  title="专业顾问"
                  text="AI 助理提供专业的信贷建议，帮助您做出明智的决策。"
                  isHighlighted={true}
                />
              </SimpleGrid>
            </VStack>
          </Box>

          <Divider my={16} />

          {/* Platform Features */}
          <Box w="full">
            <VStack spacing={12}>
              <Heading size="lg">平台特色</Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} width="full">
                <FeatureWithIcon
                  icon={FaLock}
                  title="无抵押贷款"
                  text="贷款人无需提供抵押物，仅凭信用获得小额贷款，降低准入门槛。"
                  color="purple.500"
                  bg="purple.50"
                />
                <FeatureWithIcon
                  icon={FaUserFriends}
                  title="小组借贷机制"
                  text="借款人以 5-10 人为一组，集体审核、相互担保，提高信用可靠性。"
                  color="blue.500"
                  bg="blue.50"
                />
                <FeatureWithIcon
                  icon={FaClock}
                  title="逐步还款"
                  text="贷款按小额、分期偿还，合理规划还款时间，避免过重的债务负担。"
                  color="green.500"
                  bg="green.50"
                />
                <FeatureWithIcon
                  icon={FaRegHandshake}
                  title="社会压力与信任机制"
                  text="若一人违约，整个小组信誉受损，群体压力促使还款，建立良性循环。"
                  color="orange.500"
                  bg="orange.50"
                />
                <FeatureWithIcon
                  icon={FaFemale}
                  title="女性赋权"
                  text="主要贷款对象是女性，她们更倾向于用于家庭和生计改善，促进社会发展。"
                  color="pink.500"
                  bg="pink.50"
                />
                <FeatureWithIcon
                  icon={FaChartLine}
                  title="信用成长"
                  text="良好的还款记录将提升信用额度和借款条件，帮助用户建立长期信用。"
                  color="teal.500"
                  bg="teal.50"
                />
              </SimpleGrid>
            </VStack>
          </Box>

          {/* CTA Section */}
          <Box py={10} textAlign="center">
            <VStack spacing={6}>
              <Heading size="lg" color={useColorModeValue('gray.700', 'white')}>
                准备好开始了吗？
              </Heading>
              <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
                立即开始 AI 信用评估，解锁您的信用价值
              </Text>
              <HStack spacing={4}>
                <Button
                  size="lg"
                  colorScheme="blue"
                  onClick={onStartAssessment}
                  leftIcon={<FaRobot />}
                  px={8}
                >
                  开始 AI 面试
                </Button>
                <Button
                  variant="outline"
                  colorScheme="blue"
                  size="lg"
                  onClick={onLogin}
                >
                  登录管理平台
                </Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default LandingPage;
