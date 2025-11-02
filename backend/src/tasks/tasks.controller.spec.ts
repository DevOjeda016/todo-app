import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTasksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    archive: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = { title: 'Test' };
      const task = new Task();
      mockTasksService.create.mockResolvedValue(task);

      const result = await controller.create(createTaskDto);

      expect(mockTasksService.create).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual(task);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [new Task(), new Task()];
      mockTasksService.findAll.mockResolvedValue(tasks);

      const result = await controller.findAll();

      expect(mockTasksService.findAll).toHaveBeenCalled();
      expect(result).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const task = new Task();
      const id = 'some-id';
      mockTasksService.findOne.mockResolvedValue(task);

      const result = await controller.findOne(id);

      expect(mockTasksService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(task);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated' };
      const id = 'some-id';
      const task = new Task();
      mockTasksService.update.mockResolvedValue(task);

      const result = await controller.update(id, updateTaskDto);

      expect(mockTasksService.update).toHaveBeenCalledWith(id, updateTaskDto);
      expect(result).toEqual(task);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const id = 'some-id';
      mockTasksService.remove.mockResolvedValue(undefined);

      await controller.remove(id);

      expect(mockTasksService.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('archive', () => {
    it('should archive a task', async () => {
      const id = 'some-id';
      const task = new Task();
      mockTasksService.archive.mockResolvedValue(task);

      const result = await controller.archive(id);

      expect(mockTasksService.archive).toHaveBeenCalledWith(id);
      expect(result).toEqual(task);
    });
  });
});
