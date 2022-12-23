import { environment } from './../../environments/environment';
import { mockForTestNewTask, mockIdForTest, mockTaskForTest } from './../app.contants';
import { mockListForTest } from 'src/app/app.contants';
import { ITask } from './../store/reducers/to-do.reducers';
import { HttpService } from './http.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TaskService } from './task.service';
import { HttpClient } from '@angular/common/http';

describe('TaskService', () => {
  let service: TaskService;
  // let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      
    });
    service = TestBed.inject(TaskService);
    // httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('TaskService should be created and be an instance of HttpService', () => {
    expect(service).toBeTruthy();
    expect(service).toBeInstanceOf(HttpService);
  });

  it('TaskService.getAllTasks should call api to get all tasks', done => {    
    const testData: ITask[] = mockListForTest as ITask[];

    service.getAllTasks().subscribe(data =>{
        expect(data).toEqual(testData);
        done();
    });
  
    const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toEqual('GET');
  
    req.flush(testData);
  
    httpTestingController.verify();
  });

  it('TaskService.getTask should call api to get selected task', done => {    
    const testData: ITask = mockTaskForTest as ITask;

    service.getTask(mockIdForTest).subscribe(() =>{
        done();
    });
  
    const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks/${mockIdForTest}`);
    expect(req.request.method).toEqual('GET');
  
    req.flush(testData);
  
    httpTestingController.verify();
  });

  it('TaskService.createTask should call api to create new task', done => {    
    const {id, ...testData}: ITask = mockForTestNewTask as ITask;
    const reponse = {id, ...testData};
    service.createTask(testData).subscribe(() =>{
        done();
    });
  
    const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toEqual('POST');
  
    req.flush(reponse);
  
    httpTestingController.verify();
  });

  it('TaskService.updateTask should call api to update selected task', done => {    
    const testData: ITask[] = mockListForTest as ITask[];

    service.updateTask(mockIdForTest, mockTaskForTest as ITask).subscribe(() =>{
        done();
    });
  
    const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks/${mockIdForTest}`);
    expect(req.request.method).toEqual('PATCH');
  
    req.flush(testData);
  
    httpTestingController.verify();
  });

  it('TaskService.removeTask should call api to remove selected task', done => {    

    service.removeTask(mockIdForTest).subscribe(() =>{
        done();
    });
  
    const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks/${mockIdForTest}`);
    expect(req.request.method).toEqual('DELETE');
  
    req.flush({});
  
    httpTestingController.verify();
  });
});
