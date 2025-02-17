import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  useSteps,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Card,
  CardBody,
  Badge,
  IconButton,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, AttachmentIcon } from '@chakra-ui/icons';

const steps = [
  { title: '小组申请', description: '组建5-10人小组并提交集体申请' },
  { title: 'AI访谈', description: 'AI Agent进行个人和交叉访谈' },
  { title: 'DAO审批', description: '社区投票决策和智能合约放贷' },
  { title: '还款管理', description: '分期还款和信用记录管理' },
];

const GroupLending = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const [groupMembers, setGroupMembers] = useState([{ name: '', role: '', background: '' }]);
  const [groupPurpose, setGroupPurpose] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const addMember = () => {
    if (groupMembers.length < 10) {
      setGroupMembers([...groupMembers, { name: '', role: '', background: '' }]);
    } else {
      toast({
        title: "成员数量限制",
        description: "小组最多只能有10名成员",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeMember = (index) => {
    if (groupMembers.length > 1) {
      const newMembers = groupMembers.filter((_, i) => i !== index);
      setGroupMembers(newMembers);
    }
  };

  const updateMember = (index, field, value) => {
    const newMembers = [...groupMembers];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setGroupMembers(newMembers);
  };

  const handleSubmit = () => {
    // TODO: 实现提交逻辑
    toast({
      title: "申请已提交",
      description: "您的小组贷款申请已成功提交，AI访谈即将开始",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setActiveStep(1);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <VStack spacing={6} align="stretch">
            <Card>
              <CardBody>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>贷款金额 (USDT)</FormLabel>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="请输入申请的贷款金额"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>贷款目的</FormLabel>
                    <Textarea
                      value={groupPurpose}
                      onChange={(e) => setGroupPurpose(e.target.value)}
                      placeholder="请详细描述贷款用途和预期收益"
                    />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack spacing={4}>
                  <HStack justify="space-between" width="100%">
                    <Heading size="md">小组成员</Heading>
                    <Button
                      leftIcon={<AddIcon />}
                      colorScheme="blue"
                      onClick={addMember}
                      size="sm"
                    >
                      添加成员
                    </Button>
                  </HStack>
                  {groupMembers.map((member, index) => (
                    <Box
                      key={index}
                      p={4}
                      borderWidth="1px"
                      borderRadius="lg"
                      width="100%"
                    >
                      <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                        <GridItem colSpan={2}>
                          <FormControl isRequired>
                            <FormLabel>姓名</FormLabel>
                            <Input
                              value={member.name}
                              onChange={(e) => updateMember(index, 'name', e.target.value)}
                              placeholder="成员姓名"
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <FormControl isRequired>
                            <FormLabel>角色</FormLabel>
                            <Input
                              value={member.role}
                              onChange={(e) => updateMember(index, 'role', e.target.value)}
                              placeholder="在小组中的角色"
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <FormControl>
                            <FormLabel>个人背景</FormLabel>
                            <Input
                              value={member.background}
                              onChange={(e) => updateMember(index, 'background', e.target.value)}
                              placeholder="相关技能和经验"
                            />
                          </FormControl>
                        </GridItem>
                      </Grid>
                      {index > 0 && (
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          variant="ghost"
                          size="sm"
                          position="absolute"
                          right="2"
                          top="2"
                          onClick={() => removeMember(index)}
                        />
                      )}
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack spacing={4}>
                  <Heading size="md">证明材料</Heading>
                  <Button
                    leftIcon={<AttachmentIcon />}
                    colorScheme="green"
                    variant="outline"
                    onClick={onOpen}
                  >
                    上传证明材料
                  </Button>
                  <Text fontSize="sm" color="gray.500">
                    可上传：技能证书、信用记录、收入证明等
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            <Button colorScheme="blue" size="lg" onClick={handleSubmit}>
              提交小组申请
            </Button>
          </VStack>
        );
      case 1:
        return (
          <Card>
            <CardBody>
              <VStack spacing={6}>
                <Heading size="md">AI 访谈进行中</Heading>
                <Progress size="sm" isIndeterminate colorScheme="blue" width="100%" />
                <Text>AI Agent 正在与小组成员进行个人访谈和交叉验证...</Text>
                <Stat>
                  <StatLabel>当前信用评分</StatLabel>
                  <StatNumber>85/100</StatNumber>
                  <StatHelpText>基于已完成的访谈评估</StatHelpText>
                </Stat>
              </VStack>
            </CardBody>
          </Card>
        );
      // 其他步骤的内容可以根据需要添加
      default:
        return null;
    }
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Stepper index={activeStep} width="100%">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box flexShrink='0'>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
            </Step>
          ))}
        </Stepper>

        {renderStepContent()}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>上传证明材料</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* 文件上传组件 */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default GroupLending;
