import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Importance } from './enums/importance.enums';
import { Status } from './enums/status.enums';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  const mockTaskRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    softDelete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        importance: Importance.MEDIA,
        status: Status.TODO,
      };
      const task = new Task();
      mockTaskRepository.create.mockReturnValue(task);
      mockTaskRepository.save.mockResolvedValue(task);

      const result = await service.create(createTaskDto);

      expect(mockTaskRepository.create).toHaveBeenCalledWith(createTaskDto);
      expect(mockTaskRepository.save).toHaveBeenCalledWith(task);
      expect(result).toEqual(task);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [new Task(), new Task()];
      mockTaskRepository.find.mockResolvedValue(tasks);

      const result = await service.findAll();

      expect(mockTaskRepository.find).toHaveBeenCalled();
      expect(result).toEqual(tasks);
    });

    it('should return a single task', async () => {
      const task = new Task();
      const id = 'some-id';
      mockTaskRepository.findOne.mockResolvedValue(task);

      const result = await service.findOne(id);

      expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(task);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if task not found', async () => {
      const id = 'some-non-exists-id';

      mockTaskRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
      expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Title',
      };
      const id = 'some-id';
      const existingTask = new Task();
      mockTaskRepository.findOne.mockResolvedValue(existingTask);
      mockTaskRepository.save.mockResolvedValue({
        ...existingTask,
        ...updateTaskDto,
      });

      const result = await service.update(id, updateTaskDto);

      expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockTaskRepository.save).toHaveBeenCalledWith({
        ...existingTask,
        ...updateTaskDto,
      });
      expect(result).toEqual({ ...existingTask, ...updateTaskDto });
    });
  });

  describe('remove', () => {
    it('should soft delete a task', async () => {
      const id = 'some-id';
      const task = new Task();
      task.id = id;
      mockTaskRepository.findOne.mockResolvedValue(task);
      mockTaskRepository.softDelete.mockResolvedValue({ affected: 1 });

      await service.remove(id);

      expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockTaskRepository.softDelete).toHaveBeenCalledWith(id);
    });
  });

  describe('archive', () => {
    it('should archive a task', async () => {
      const id = 'some-id';
      const task = new Task();
      task.id = id;
      mockTaskRepository.findOne.mockResolvedValue(task);
      mockTaskRepository.update.mockResolvedValue({ affected: 1 });

      await service.archive(id);

      expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockTaskRepository.save).toHaveBeenCalledWith({
        ...task,
        archived: true,
      });
    });
  });
});
