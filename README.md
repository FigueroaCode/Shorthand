This plugin allows users to use shorthand notation, and expand it into common Java loops.

To convert a shorthand phrase into functional code, select the text and press Alt-X.

Implemented Shorthand Function Formats:

format: mainClass nameOfClass
result: class  nameOfClass
        {
        	public static void main(String args[])
        		{
        //insert code here
        		}
        }

format: publicClass nameOfClass
result: public class  nameOfClass
        {
        	public  nameOfClass()
        		{

        		}
         	public  nameOfClass(String name)
        		{

        		}
        }

format: for loopEnd
result: for(int i = 0; i < loopEnd; i++){}

format: for loopStart loopEnd
result: for(int i = loopStart; i < loopEnd; i++){}
  or
        for(int i = loopStart; i > loopEnd; i--){}

format: for var loopStart loopEnd
result: for(int var = loopStart; var < loopEnd; var++){}
  or
        for(int var = loopStart; var > loopEnd; var--){}

format: for var loopEnd
result: for(int var = 0; var < loopEnd; i++ ){}

format: switch argument numOfCases
result: switch(argument){
          case 1:
            break;
          case 2:
            break;
          ...
          ...
          case numOfCases:
            break;
          default:
            break;
        }

format: nested for loopEnds numOfLoops
result: for(int a = 0; a < loopEnds; a++){
          for(int b = 0; b < loopEnds; b++){
            ...
            ...
            for(int z = 0; z < loopEnds; z++){
              ...
            }
          }
        }

format: bubbleSort
result: void bubbleSort(int arr[])
        {
        		int n = arr.length;
        		for (int i = 0; i < n-1; i++)
        		{
        			for (int j = 0; j < n-i-1; j++)
        			{
        				if (arr[j] > arr[j+1])
        					{
        						int temp = arr[j];
        						arr[j] = arr[j+1];
        						arr[j+1] = temp;
        					}
        			}
        		}
        }

format: insertionSort
result: void sort(int arr[])
        {
        	int n = arr.length;
        	for (int i=1; i<n; ++i)
        	{
        		int key = arr[i];
        		int j = i-1;
        		while (j>=0 && arr[j] > key)
        		{
        			arr[j+1] = arr[j];
        			j = j-1;
        		}
        		arr[j+1] = key;
        	}
        }
